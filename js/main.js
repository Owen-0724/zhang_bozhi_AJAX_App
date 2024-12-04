(() => {

  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");

  //functions
  function loadInfoBoxes() {
    loader.classList.toggle("hidden");
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response=> response.json())
      .then((infoBoxes) => {
        console.log(infoBoxes);
        infoBoxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          const img = document.createElement("img");
          img.src = infoBox.thumbnail;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          selected.appendChild(img);
        });
        loader.classList.toggle("hidden");
      })
      .catch((error) => {
        console.error("Error loading infoBoxes:", error);
        loader.classList.toggle("hidden");
      });
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    loader.classList.toggle("hidden");
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response=> response.json())
      .then((materials) => {
        materialList.innerHTML = "";
        materials.forEach((material) => {

          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        loader.classList.toggle("hidden");
      })
      .catch((error) => {
        console.error("Error loading materials:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Something went wrong, please try again.";
        materialList.appendChild(errorMessage);

        loader.classList.toggle("hidden");
      });
  }


loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

