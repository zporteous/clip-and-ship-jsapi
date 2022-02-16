require([
  "esri/widgets/Sketch",
  "esri/Map",
  "esri/layers/GraphicsLayer",
  "esri/views/MapView"
], (Sketch, Map, GraphicsLayer, MapView) => {
  const graphicsLayer = new GraphicsLayer();

  const map = new Map({
    basemap: "topo-vector",
    layers: [graphicsLayer]
  });

  const view = new MapView({
    container: "map-view",
    map: map,
    zoom: 5,
    center: [90, 45]
  });

  view.when(() => {
    const sketch = new Sketch({
      layer: graphicsLayer,
      view: view,
      layout:"vertical",
      availableCreateTools:['rectangle'],
      // graphic will be selected as soon as it is created
      creationMode: "single",
      visibleElements:{
        selectionTools:{
          "rectangle-selection":false,
          "lasso-selection": false
        },
        settingsMenu: false,
        undoRedoMenu:false,
      }
    });

    view.ui.add(sketch, "top-right");

  });

  var submitModalContours  = document.getElementById("submit-modal-contours")
  var submitButtonContours = document.getElementById('submit-contours')
  var submitModalImagery = document.getElementById("submit-modal-imagery")
  var submitButtonImagery = document.getElementById('submit-imagery')

  submitButtonContours.addEventListener('click', changeToLoadingContours)
  submitButtonImagery.addEventListener('click', changeToLoadingImagery)

  function changeToLoadingContours() {
    submitButtonContours.loading = !submitButtonContours.loading;
    console.log(document.getElementById("export-format").selectedItem.value);
    
    setTimeout(()=>{
      console.log("loaded")

      submitButtonContours.loading = !submitButtonContours.loading;
      submitModalContours.active = !submitModalContours.active
    }, 1000)
    console.log("helo")
    return
  }

  function changeToLoadingImagery() {
    submitButtonImagery.loading = !submitButtonImagery.loading;
    // console.log(document.getElementById("export-format").selectedItem.value);
    document.getElementById("success-modal-imagery").active = 
    setTimeout(()=>{
      console.log("loaded")

      submitButtonImagery.loading = !submitButtonImagery.loading;
      submitModalImagery.active = !submitModalImagery.active
    }, 1000)
    console.log("helo")
    return
  }

});

