// Recherche de personnages et affichage des liens entre personnages, lieux et factions.

function idsFor(row, names) {
  return splitIds(field(row,names));
}

function relatedToSelected(person) {
  if(!selectedEntity) return false;
  const entity=selectedEntity.row, kind=selectedEntity.sheet.kind;
  const personPlaceIds=idsFor(person,["Lieu_ID","Lieu_IDs","Lieu ID","Lieux_ID","Lieu"]);
  const personFactionIds=idsFor(person,["Faction_ID","Faction_IDs","Faction ID","Factions_ID","Faction"]);

  if(kind==="place") {
    const placeIds=idsFor(entity,["Lieu_ID","ID","Id"]);
    const placeName=getName(entity);
    return personPlaceIds.some(id=>placeIds.includes(id)||normalize(id)===normalize(placeName)) ||
      idsFor(person,["Lieu","Lieux","Lieu_Nom","Lieux_Noms"]).some(n=>normalize(n)===normalize(placeName));
  }

  if(kind==="faction") {
    const factionIds=idsFor(entity,["Faction_ID","ID","Id"]);
    const factionName=getName(entity);
    return personFactionIds.some(id=>factionIds.includes(id)||normalize(id)===normalize(factionName)) ||
      idsFor(person,["Faction","Factions","Faction_Nom","Factions_Noms"]).some(n=>normalize(n)===normalize(factionName));
  }

  return false;
}

function renderRelatedPeople(entity) {
  selectedEntity=entity;
  const name=getName(entity.row), kind=entity.sheet.kind;
  $("relatedTitle").textContent=kind==="faction"?"Membres de la faction":"Personnes liées";
  $("relatedContext").textContent=name+" · "+entity.sheet.name;
  const linked=peopleRows.filter(p=>relatedToSelected(p))
    .sort((a,b)=>getName(a).localeCompare(getName(b),"fr",{sensitivity:"base"}));
  renderPersonButtons(linked,$("peopleList"),"Aucune personne liée trouvée. Vérifie les colonnes Lieu_ID et Faction_ID dans l’onglet Personnes.");
}

function renderPersonButtons(rows,container,emptyMessage) {
  container.innerHTML="";
  if(!rows.length) {
    const p=document.createElement("p");
    p.className="empty";
    p.textContent=emptyMessage;
    container.appendChild(p);
    return;
  }

  rows.forEach(row=>{
    const button=document.createElement("button");
    button.className="person-item";
    const strong=document.createElement("strong");
    strong.textContent=getName(row);
    const meta=[field(row,["Race"]),field(row,["Faction","Faction_Nom"]),field(row,["Lieu","Lieu_Nom"])].filter(Boolean).join(" · ");
    const span=document.createElement("span");
    span.textContent=meta||"Cliquer pour ouvrir la fiche";
    button.append(strong,span);
    button.addEventListener("click",()=>showPerson(row));
    container.appendChild(button);
  });
}

function renderSearch(query) {
  const q=normalize(query);
  const results=peopleRows.filter(row=>!q||normalize(getName(row)).includes(q))
    .sort((a,b)=>getName(a).localeCompare(getName(b),"fr",{sensitivity:"base"}))
    .slice(0,80);
  renderPersonButtons(results,$("searchResults"),"Aucun personnage trouvé.");
}

function showPerson(row) {
  $("personModalTitle").textContent=getName(row);
  const fields=[
    ["ID",["Personnage_ID","ID","Id"]],
    ["Race",["Race"]],
    ["Faction(s)",["Faction_ID","Faction_IDs","Faction","Factions"]],
    ["Lieu(x)",["Lieu_ID","Lieu_IDs","Lieu","Lieux"]],
    ["Description",["Description","Bio","Histoire"]],
    ["Fiche",["Fiche"]]
  ];
  const body=$("personModalBody");
  body.innerHTML="";

  fields.forEach(([label,names])=>{
    const value=field(row,names);
    if(!value) return;
    const p=document.createElement("p");
    const strong=document.createElement("strong");
    strong.textContent=label+": ";
    p.append(strong,document.createTextNode(value));
    body.appendChild(p);
  });

  const fiche=field(row,["Fiche","URL"]);
  if(fiche && /^https?:\/\//i.test(fiche)) {
    const a=document.createElement("a");
    a.href=fiche;
    a.target="_blank";
    a.rel="noopener noreferrer";
    a.textContent="Ouvrir la fiche complète";
    body.appendChild(a);
  }
  $("personModal").classList.add("open");
}
