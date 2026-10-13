// Événements de l'interface et démarrage de l'application.

$("personSearch").addEventListener("input",e=>renderSearch(e.target.value));
$("closeMap").addEventListener("click",closeRegionalMap);
$("regionalOverlay").addEventListener("click",e=>{
  if(e.target===$("regionalOverlay")) closeRegionalMap();
});
$("closePerson").addEventListener("click",()=>$("personModal").classList.remove("open"));
$("personModal").addEventListener("click",e=>{
  if(e.target===$("personModal")) $("personModal").classList.remove("open");
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") {
    closeRegionalMap();
    $("personModal").classList.remove("open");
  }
});

$("copy").addEventListener("click",async()=>{
  if(!selectedPoint) {
    status("Clique d’abord sur la carte principale pour sélectionner un point.");
    return;
  }
  const coords=selectedPoint.x+","+selectedPoint.y;
  try {
    await navigator.clipboard.writeText(coords);
    status("Coordonnées copiées : "+coords);
  } catch {
    status("Copie manuelle : "+coords);
  }
});

$("clear").addEventListener("click",()=>{
  if(selectedMarker&&map) map.removeLayer(selectedMarker);
  selectedMarker=null;
  selectedPoint=null;
  $("selected").textContent="aucun";
});

initMainMap();
