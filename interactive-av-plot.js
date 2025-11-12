const dataURL = "fme-24-features-emotions-after.csv";

d3.csv(dataURL).then(data => {
  data.forEach(d => {
    d.arousal = +d.arousal;
    d.valence = +d.valence;
    d.timestamp = +d.timestamp;
  });

  const categoryColors = {
    "calm/relax": "#88ffb3ff",
    "happy/joy": "#e9f934ff",
    "epic/exciting": "#fba328fb",
    "tense/anticipation": "#e94040ff",
    "fear/menacing": "#4d39e1ff",
    "eerie/creepy": "#9b40dcff",
    "sad/melancholy": "#75b6faff",
    "curious/magical": "#f382d1ff",
    "no_emotion": "#7f7f7f"
  };

  const originalColors = data.map(d => categoryColors[d.final_category_name] || "#888888");

  const trace = {
    x: data.map(d => d.valence),
    y: data.map(d => d.arousal),
    mode: "markers",
    type: "scatter",
    marker: {
      size: 10,
      color: originalColors,
      opacity: 0.9,
      line: { width: 0 }
    },
    customdata: data.map(d => ({
      song_name: d.song_name,
      film: d.film,
      genre: d.genre,
      emotion_sentence: d.emotion_sentence,
      category: d.final_category_name,
      arousal: d.arousal,
      valence: d.valence
    })),
    hoverinfo: "none"
  };

  const layout = {
    xaxis: { title: "Valence (positivity)" },
    yaxis: { title: "Arousal (energy)" },
    margin: { t: 20 },
    dragmode: "zoom"
  };

  Plotly.newPlot("graph", [trace], layout, { responsive: true });

  const graphDiv = document.getElementById("graph");
  const infoBox = document.getElementById("info-box");

  let selectedPointIndex = null;
  let trajectoryVisible = false;
  let trajectoryTraceId = null;

  // Hover effect
  graphDiv.on("plotly_hover", eventData => {
    const pointIndex = eventData.points[0].pointIndex;
    if (pointIndex !== selectedPointIndex) {
      Plotly.restyle("graph", { "marker.size": 12 }, [pointIndex]);
    }
  });

  graphDiv.on("plotly_unhover", eventData => {
    const pointIndex = eventData.points[0].pointIndex;
    if (pointIndex !== selectedPointIndex) {
      Plotly.restyle("graph", { "marker.size": 10 }, [pointIndex]);
    }
  });

  // Click on a dot
  graphDiv.on("plotly_click", eventData => {
    const pointIndex = eventData.points[0].pointIndex;
    const pointData = data[pointIndex];

    // Clicking same dot resets
    if (selectedPointIndex === pointIndex) {
      resetPlot();
      return;
    }

    selectedPointIndex = pointIndex;
    trajectoryVisible = false;
    removeTrajectory();

    const newColors = data.map((d, i) => i === pointIndex ? categoryColors[d.final_category_name] : "#cccccc");
    const newSizes = data.map((d, i) => i === pointIndex ? 14 : 10);

    Plotly.restyle("graph", { "marker.color": [newColors], "marker.size": [newSizes] });

    // Add info box content including toggle button
    infoBox.innerHTML = `
      <h3>${pointData.song_name || "Unknown Song"}</h3>
      <p><b>Film:</b> ${pointData.film || "N/A"}</p>
      <p><b>Genre:</b> ${pointData.genre || "N/A"}</p>
      <p><b>Emotion:</b> ${pointData.emotion_sentence || "N/A"}</p>
      <p><b>Category:</b> ${pointData.final_category_name || "N/A"}</p>
      <p><b>Arousal:</b> ${pointData.arousal}</p>
      <p><b>Valence:</b> ${pointData.valence}</p>
      <p><b>Timestamp:</b> ${pointData.timestamp}s</p>
      <button class="trajectory-btn" id="toggle-trajectory">Show Trajectory</button>
    `;

    // Attach event listener to the new button
    const toggleButton = document.getElementById("toggle-trajectory");
    toggleButton.addEventListener("click", () => {
      if (trajectoryVisible) {
        removeTrajectory();
        toggleButton.classList.remove("active");
        toggleButton.textContent = "Show Trajectory";
        trajectoryVisible = false;
      } else {
        showTrajectory(pointData, toggleButton);
      }
    });
  });

  // Function to show trajectory
  function showTrajectory(pointData, toggleButton) {
    const categoryColor = categoryColors[pointData.final_category_name] || "#888";

    const participant = pointData.participant_id;
    const filePath = pointData.file_path;

    const trajPoints = data
      .filter(d => d.participant_id === participant && d.file_path === filePath)
      .sort((a, b) => a.timestamp - b.timestamp);

    if (trajPoints.length < 2) return; // no trajectory

    const trace = {
      x: trajPoints.map(d => d.valence),
      y: trajPoints.map(d => d.arousal),
      mode: "lines+markers",
      line: { color: categoryColor, width: 2 },
      marker: {
        size: trajPoints.map((d, i) => 
          i === 0 ? 12 : (i === trajPoints.length - 1 ? 14 : 10)
        ),
        color: trajPoints.map((d, i) => 
          i === 0 ? "black" : categoryColor
        ),
        opacity: 1
      },
      name: "Trajectory"
    };

    Plotly.addTraces("graph", trace).then(gd => {
      trajectoryTraceId = gd.data.length - 1;
      trajectoryVisible = true;
      toggleButton.classList.add("active");
      toggleButton.textContent = "Hide Trajectory";
    });
  }

  // Function to remove trajectory
  function removeTrajectory() {
    if (trajectoryTraceId !== null) {
      Plotly.deleteTraces("graph", [trajectoryTraceId]);
      trajectoryTraceId = null;
    }
  }

  // Function to reset plot to default
  function resetPlot() {
    Plotly.restyle("graph", { "marker.color": [originalColors], "marker.size": [10] });
    infoBox.innerHTML = "Click a point to view song information.";
    selectedPointIndex = null;
    removeTrajectory();
    trajectoryVisible = false;
  }

  // Double click background resets
  graphDiv.on("plotly_doubleclick", resetPlot);

  // Add color key
  const keyDiv = document.getElementById("key");
  keyDiv.style.marginTop = "10px";
  keyDiv.style.display = "flex";
  keyDiv.style.flexWrap = "wrap";
  keyDiv.style.gap = "10px";

  Object.entries(categoryColors).forEach(([category, color]) => {
    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "5px";

    const box = document.createElement("div");
    box.style.width = "15px";
    box.style.height = "15px";
    box.style.backgroundColor = color;
    box.style.border = "1px solid #000";

    const label = document.createElement("span");
    label.textContent = category;

    item.appendChild(box);
    item.appendChild(label);
    keyDiv.appendChild(item);
  });
});
