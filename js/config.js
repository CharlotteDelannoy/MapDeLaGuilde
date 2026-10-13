// Chargement des données provenant des onglets Google Sheets.

async function fetchCSV(url, name) {
  const response=await fetch(url);
  if(!response.ok) throw new Error("HTTP "+response.status);
  const csv=await response.text();
  if (csv.trim().startsWith("<!DOCTYPE") || csv.trim().startsWith("<html")) {
    throw new Error("La feuille ne renvoie pas du CSV. Vérifie la publication de l’onglet.");
  }
  const parsed=Papa.parse(csv,{
    header:true,
    skipEmptyLines:true,
    transformHeader:h=>String(h).replace(/^\uFEFF/,"").trim()
  });
  return (parsed.data||[]).filter(row=>Object.values(row).some(v=>String(v??"").trim()!==""));
}

async function loadAllData() {
  $("layers").textContent="";
  status("Carte chargée ("+imageWidth+" × "+imageHeight+" px). Chargement des onglets…");

  const results=await Promise.all(SHEETS.map(async sheet=>{
    try {
      const rows=await fetchCSV(sheet.url,sheet.name);
      return {sheet,rows};
    } catch(error) {
      console.error("CSV",sheet.name,error);
      return {sheet,rows:[],error:error.message};
    }
  }));

  loadedSheets=results;
  peopleRows=(results.find(r=>r.sheet.kind==="person")||{rows:[]}).rows;

  for(const result of results) {
    const {sheet,rows,error}=result;
    const group=L.layerGroup();
    let count=0, invalid=0, hidden=0;

    for(const row of rows) {
      if(!isVisible(field(row,["Visible","visible"]))) { hidden++; continue; }
      const marker=createMarker(row,sheet,group,imageWidth,imageHeight,MAIN_MAP_ID);
      if(marker) count++;
      else {
        const x=field(row,["Region X","Region_X","X"]), y=field(row,["Region Y","Region_Y","Y"]);
        if(x!==""||y!=="") {
          const nx=Number(x.replace(",",".")), ny=Number(y.replace(",","."));
          if(!Number.isFinite(nx)||!Number.isFinite(ny)||nx<0||ny<0||nx>imageWidth||ny>imageHeight) invalid++;
        }
      }
    }

    mainLayers.set(sheet.name,group);
    if(count) group.addTo(map);

    if(error) {
      const line=document.createElement("div");
      line.className="small";
      line.textContent=sheet.name+" — erreur : "+error;
      $("layers").appendChild(line);
    } else {
      addLayerControl(sheet,rows);
    }
    result.stats={count,invalid,hidden};
  }

  await loadMapDefinitions();
  renderSearch("");
  status(results.map(r=>r.sheet.name+": "+(r.error?"ERREUR — "+r.error:(r.stats?.count||0)+" point(s) sur la carte principale")).join("\n"));
}

async function loadMapDefinitions() {
  mapDefinitions=[{Carte_ID:MAIN_MAP_ID,Nom:"Bordeciel",Image_URL:MAP_IMAGE,Visible:"oui"}];

  if(CARTES_CSV_URL) {
    try {
      const regional=await fetchCSV(CARTES_CSV_URL,"Cartes");
      mapDefinitions.push(...regional.filter(row=>isVisible(field(row,["Visible","visible"])) && field(row,["Carte_ID","ID","Id"])));
    } catch(error) {
      console.error("Onglet Cartes",error);
      status($("status").textContent+"\nCartes : "+error.message);
    }
  }

  const select=$("mapSelect");
  select.innerHTML="";
  const placeholder=document.createElement("option");
  placeholder.value="";
  placeholder.textContent="Choisir une carte…";
  select.appendChild(placeholder);

  mapDefinitions.filter(def=>getId(def)!==MAIN_MAP_ID).forEach(def=>{
    const opt=document.createElement("option");
    opt.value=field(def,["Carte_ID","ID","Id"]);
    opt.textContent=field(def,["Nom","Name"])||opt.value;
    select.appendChild(opt);
  });

  $("openMap").disabled=select.options.length<=1;
  select.addEventListener("change",()=>{$("openMap").disabled=!select.value;});
  $("openMap").addEventListener("click",()=>openRegionalMapById(select.value));
}
