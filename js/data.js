// Construction des marqueurs et du contenu des popups Leaflet.

function popupHTML(row, sheetName, mapId) {
  const name=getName(row), category=field(row,["Categorie","Catégorie","Type"]), id=getId(row);
  const region=field(row,["Region","Région"]), description=field(row,["Description","Résumé","Notes"]);
  const fiche=field(row,["Fiche","URL","Lien"]), imageURL=field(row,["Image_URL","Image URL"]);
  const meta=[sheetName,category,region,id].filter(Boolean).join(" · ");
  let html='<div class="popup-title">'+escapeHTML(name)+'</div>';
  if(meta) html+='<div class="popup-meta">'+escapeHTML(meta)+'</div>';
  if(description) html+='<div class="popup-description">'+escapeHTML(description)+'</div>';
  if(fiche && /^https?:\/\//i.test(fiche)) {
    html+='<p><a href="'+escapeHTML(fiche)+'" target="_blank" rel="noopener noreferrer">Ouvrir la fiche</a></p>';
  }
  if(imageURL && /^https?:\/\//i.test(imageURL)) {
    html+='<img class="popup-image" src="'+escapeHTML(imageURL)+'" alt="'+escapeHTML(name)+'" onerror="this.style.display=\'none\'">';
  }
  if(mapId && mapId!==MAIN_MAP_ID) {
    html+='<div class="popup-actions"><button type="button" onclick="openRegionalMapById(\''+escapeHTML(mapId).replace(/'/g,"\\'")+'\')">Ouvrir la carte associée</button></div>';
  }
  return html;
}

function markerStyle(sheet) {
  return {
    radius:sheet.kind==="place"?7:6,
    color:sheet.color,
    fillColor:sheet.color,
    fillOpacity:.92,
    weight:2
  };
}

function createMarker(row, sheet, targetMap, w, h, mapId) {
  if(!isVisible(field(row,["Visible","visible"]))) return null;

  const rawX=field(row,["Region X","Region_X","X"]), rawY=field(row,["Region Y","Region_Y","Y"]);
  const x=Number(rawX.replace(",",".")), y=Number(rawY.replace(",","."));
  if(rawX===""||rawY===""||!Number.isFinite(x)||!Number.isFinite(y)||x<0||y<0||x>w||y>h) return null;

  const rowMapId=getMapId(row);
  if(mapId===MAIN_MAP_ID && !isMainMapRow(row)) return null;
  if(mapId!==MAIN_MAP_ID && normalize(rowMapId)!==normalize(mapId)) return null;

  const marker=L.circleMarker([h-y,x],markerStyle(sheet));
  marker.bindPopup(popupHTML(row,sheet.name,rowMapId));
  marker.on("click",()=>{
    selectedEntity={row,sheet};
    renderRelatedPeople(selectedEntity);
  });
  targetMap.addLayer(marker);
  return marker;
}

function addLayerControl(sheet, rows) {
  const line=document.createElement("label");
  line.className="layer";
  const checkbox=document.createElement("input");
  checkbox.type="checkbox";
  checkbox.checked=true;

  const dot=document.createElement("span");
  dot.className="dot";
  dot.style.backgroundColor=sheet.color;

  const text=document.createElement("span");
  text.textContent=sheet.name+" ("+rows.length+")";

  checkbox.addEventListener("change",()=>{
    const group=mainLayers.get(sheet.name);
    if(!group) return;
    if(checkbox.checked) group.addTo(map); else map.removeLayer(group);
    if(activeRegionalMap) {
      const rg=regionalLayers.get(sheet.name);
      if(rg) {
        if(checkbox.checked) rg.addTo(regionalMap);
        else regionalMap.removeLayer(rg);
      }
    }
  });

  line.append(checkbox,dot,text);
  $("layers").appendChild(line);
}
