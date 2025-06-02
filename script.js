//////////////////////////////////////////////////////////////////////////
// initial js for navigating between pages and the download csv pages
// and the interactive 'Tables Explained' Page and 'FME-24 Dataset' page


function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active');
}


function toggleMoreInfo(infoId, button) {
    const info = document.getElementById(infoId);
    const isVisible = info.style.display === 'block';
    
    if (isVisible) {
        info.style.display = 'none';
        button.textContent = 'More Details';
    } else {
        info.style.display = 'block';
        button.textContent = 'Hide Details';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("survey-table");
    const tooltip = document.getElementById("column-tooltip");

    const tooltipText = {
        0: "This column shows participants anonymous randomly generated ID.",
        1: "This column shows the date/time the survey was completed.",
        2: "These columns show the information for audio file 1 for this participant: name, sentence, familiarity, AV ratings, timestamps, annotation counts",
        3: "This column shows the participants' Age Range",
        4: "countr(ies) that I spent most of my formative years",
        5: "Gender",
        6: "nationality",
        7: "current occupation",
        8: "These columns show the information for audio files 2-10 for this participant",
        9:"I listen to music attentively ... day",
        10:"I listen to music casually ... a day",
        11:"I engaged in regular, daily practice of a musical instrument (including voice) for the following number of years",
        12:"I am able to judge whether someone is a good singer or not",
        13:"I find it difficult to spot mistakes in a performance of a song even if I know the tune.",
        14:"I can compare and discuss differences between two performances or versions of the same piece of music.",
        15:"I can tell when people sing or play out of time to the beat",
        16:"I can tell when people sing or play out of tune",
        17:" I would consider myself a musician.",
        18:"I am familiar with music production and/or using DAWs etc",
        19:"Music is very important to me:",
        20:"I spend a lot of my free time doing music-related activities",
        21:"Music is kind of an addiction for me – I couldn’t live without it",
        22:"I keep track of new music that I come across (e.g. new artists or recordings)",
        23:"I often read or search the internet for things related to music",
        24:"My favourite genre of music is:",
        25:"Pieces of music rarely evoke emotions for me",
        26:"Music can evoke my memories of past people and places",
        27:"I sometimes choose (to listen/to play) music that can trigger shivers down my spine",
        28:"I often pick certain music to motivate or excite me",
        29:"I am able to talk about the emotions that a piece of music evokes for me"
        // Add more if needed for other columns
    };

    for (let i = 0; i < 30; i++) {
        const columnCells = table.querySelectorAll(`.col-${i}`);

        columnCells.forEach(cell => {
            cell.addEventListener("mouseenter", () => {
                // Highlight the entire column
                columnCells.forEach(c => c.classList.add("highlighted"));
                tooltip.textContent = tooltipText[i] || "";
            });

            cell.addEventListener("mouseleave", () => {
                // Remove highlight
                columnCells.forEach(c => c.classList.remove("highlighted"));
                tooltip.textContent = "";
            });
        });
    }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////
// js for 'about.html' page = play around valence/arousal page ////////

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const padding = 40; // Padding around the canvas (space for axis labels)
const graphWidth = canvas.width - 2 * padding;
const graphHeight = canvas.height - 2 * padding;

let clicks = [];
const maxClicks = 20;
let showAnnotations = true;
let showAdjectives = false; // New toggle for adjectives

const resultsDiv = document.getElementById("results");
const resetButton = document.getElementById("resetButton");
const annotationToggle = document.getElementById("annotationToggle");
const adjectiveToggle = document.getElementById("adjectiveToggle");

function drawGrid() {
    const step = graphWidth / 10; // spacing for grid lines (adjusted for -1.0 to 1.0 range)
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    // Draw grid lines for X and Y axes
    for (let x = padding; x <= canvas.width - padding; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
    }

    for (let y = padding; y <= canvas.height - padding; y += step) {
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw center axis (x=0, y=0)
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;

    // X axis (adjusted to center of graph)
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height / 2);
    ctx.lineTo(canvas.width - padding, canvas.height / 2);
    ctx.stroke();

    // Y axis (adjusted to center of graph)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, padding);
    ctx.lineTo(canvas.width / 2, canvas.height - padding);
    ctx.stroke();
}

function drawAnnotations() {
    ctx.save();
    ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Positivity label (X axis)
    ctx.fillText("←←← Positivity →→→", canvas.width / 2, canvas.height - padding + 20);

    // Energy label (Y axis, vertical)
    ctx.translate(padding - 30, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("←←← Energy →→→", 0, 10);
    ctx.restore();

    // Draw numeric labels
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const gridCount = 5;
    const step = graphWidth / gridCount;

    // X-axis numbers
    for (let i = 0; i <= gridCount; i++) {
        const x = padding + i * step;
        const label = (i / (gridCount / 2) - 1).toFixed(1);
        ctx.fillText(label, x, canvas.height / 2 + 5);
    }

    // Y-axis numbers
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= gridCount; i++) {
        const y = padding + i * step;
        const label = (1 - i / (gridCount / 2)).toFixed(1);
        ctx.fillText(label, canvas.width / 2 - 8, y);
    }

    ctx.restore();
}

function drawAdjectives() {
    // Draw words at specific coordinates only if the toggle is on
    if (!showAdjectives) return;

    ctx.save();
    ctx.fillStyle = "rgba(50, 50, 50, 0.7)"; // Darker grey for adjectives
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw 'tense' at (x=-0.9, y=0.8)
    const xTense = padding + (0.4 * graphWidth / 2); // x=-0.9
    const yTense = padding + (1 - 0.6) * graphHeight / 2; // y=0.8
    ctx.fillText("Tense", xTense, yTense);

    // Draw 'relaxed' at (x=0.8, y=-0.9)
    const xRelaxed = padding + (1 - -0.8) * graphWidth / 2; // x=0.8
    const yRelaxed = padding + (1 - -0.4) * graphHeight / 2; // y=-0.9
    ctx.fillText("Relaxed", xRelaxed, yRelaxed);

    // Draw 'excited' at (x=0.8, y=-0.9)
    const xExcited = padding + (1 - -0.3) * graphWidth / 2; // x=0.8
    const yExcited = padding + (1 - 0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Excited", xExcited, yExcited);

    // Draw 'depressed' at (x=0.8, y=-0.9)
    const xDepressed = padding + (1 - 0.85) * graphWidth / 2; // x=0.8
    const yDepressed = padding + (1 - -0.45) * graphHeight / 2; // y=-0.9
    ctx.fillText("Depressed", xDepressed, yDepressed);

    // Draw 'tired' at (x=0.8, y=-0.9)
    const xTired = padding + (1 - 0.1) * graphWidth / 2; // x=0.8
    const yTired = padding + (1 - -0.9) * graphHeight / 2; // y=-0.9
    ctx.fillText("Tired", xTired, yTired);

    // Draw 'sleepy' at (x=0.8, y=-0.9)
    const xSleepy = padding + (1 - -0.1) * graphWidth / 2; // x=0.8
    const ySleepy = padding + (1 - -0.9) * graphHeight / 2; // y=-0.9
    ctx.fillText("Sleepy", xSleepy, ySleepy);

    // Draw 'content' at (x=0.8, y=-0.9)
    const xContent = padding + (1 - -0.75) * graphWidth / 2; // x=0.8
    const yContent = padding + (1 - -0.1) * graphHeight / 2; // y=-0.9
    ctx.fillText("Content", xContent, yContent);

    // Draw 'joyous' at (x=0.8, y=-0.9)
    const xJoyeous = padding + (1 - -0.75) * graphWidth / 2; // x=0.8
    const yJoyeous = padding + (1 - 0.1) * graphHeight / 2; // y=-0.9
    ctx.fillText("Joyeous", xJoyeous, yJoyeous);

    // Draw 'delighted' at (x=0.8, y=-0.9)
    const xDelighted = padding + (1 - -0.65) * graphWidth / 2; // x=0.8
    const yDelighted = padding + (1 - 0.6) * graphHeight / 2; // y=-0.9
    ctx.fillText("Delighted", xDelighted, yDelighted);

    // Draw 'nervous' at (x=0.8, y=-0.9)
    const xNervous = padding + (1 - 0.7) * graphWidth / 2; // x=0.8
    const yNervous = padding + (1 - 0.3) * graphHeight / 2; // y=-0.9
    ctx.fillText("Nervous", xNervous, yNervous);

    // Draw 'afraid' at (x=0.8, y=-0.9)
    const xAfraid = padding + (1 - 0.4) * graphWidth / 2; // x=0.8
    const yAfraid = padding + (1 - 0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Afraid", xAfraid, yAfraid);

    // Draw 'exhilarated' at (x=0.8, y=-0.9)
    const xExhilarated = padding + (1 - -0.8) * graphWidth / 2; // x=0.8
    const yExhilarated = padding + (1 - 0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Exhilarated", xExhilarated, yExhilarated);

    // Draw 'Angry' at (x=0.8, y=-0.9)
    const xAngry = padding + (1 - 0.85) * graphWidth / 2; // x=0.8
    const yAngry = padding + (1 - 0.85) * graphHeight / 2; // y=-0.9
    ctx.fillText("Angry", xAngry, yAngry);

    // Draw 'Agitated' at (x=0.8, y=-0.9)
    const xAgitated = padding + (1 - 0.1) * graphWidth / 2; // x=0.8
    const yAgitated = padding + (1 - 0.85) * graphHeight / 2; // y=-0.9
    ctx.fillText("Agitated", xAgitated, yAgitated);

    // Draw 'Calm' at (x=0.8, y=-0.9)
    const xCalm = padding + (1 - -0.45) * graphWidth / 2; // x=0.8
    const yCalm = padding + (1 - -0.75) * graphHeight / 2; // y=-0.9
    ctx.fillText("Calm", xCalm, yCalm);

    // Draw 'Bliss' at (x=0.8, y=-0.9)
    const xBliss = padding + (1 - -0.5) * graphWidth / 2; // x=0.8
    const yBliss = padding + (1 - -0.5) * graphHeight / 2; // y=-0.9
    ctx.fillText("Bliss", xBliss, yBliss);

    // Draw 'Disgust' at (x=0.8, y=-0.9)
    const xDisgust = padding + (1 - 0.85) * graphWidth / 2; // x=0.8
    const yDisgust = padding + (1 - -0.1) * graphHeight / 2; // y=-0.9
    ctx.fillText("Disgust", xDisgust, yDisgust);

    // Draw 'Distressed' at (x=0.8, y=-0.9)
    const xDistressed = padding + (1 - 0.8) * graphWidth / 2; // x=0.8
    const yDistressed = padding + (1 - 0.45) * graphHeight / 2; // y=-0.9
    ctx.fillText("Distressed", xDistressed, yDistressed);

    // Draw 'Bored' at (x=0.8, y=-0.9)
    const xBored = padding + (1 - 0.4) * graphWidth / 2; // x=0.8
    const yBored = padding + (1 - -0.6) * graphHeight / 2; // y=-0.9
    ctx.fillText("Bored", xBored, yBored);

    // Draw 'Enthusiastic' at (x=0.8, y=-0.9)
    const xEnthusiastic = padding + (1 - -0.8) * graphWidth / 2; // x=0.8
    const yEnthusiastic = padding + (1 - 0.4) * graphHeight / 2; // y=-0.9
    ctx.fillText("Enthusiastic", xEnthusiastic, yEnthusiastic);

    // Draw 'Gloomy' at (x=0.8, y=-0.9)
    const xGloomy = padding + (1 - 0.75) * graphWidth / 2; // x=0.8
    const yGloomy = padding + (1 - -0.75) * graphHeight / 2; // y=-0.9
    ctx.fillText("Gloomy", xGloomy, yGloomy);

    // Draw 'Drousy' at (x=0.8, y=-0.9)
    const xDrousy = padding + (1 - 0.4) * graphWidth / 2; // x=0.8
    const yDrousy = padding + (1 - -0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Drousy", xDrousy, yDrousy);

    ctx.restore();
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    if (showAnnotations) {
        drawAnnotations();
    }

    if (showAdjectives) {
        drawAdjectives(); // Draw adjectives if the toggle is on
    }

    // Draw points on the graph (constrained within bounds)
    for (const point of clicks) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
    }
}

canvas.addEventListener("click", (e) => {
    if (clicks.length >= maxClicks) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - padding;
    const y = e.clientY - rect.top - padding;

    // Clip the coordinates to be within -1 to 1 range
    const normX = Math.max(-1, Math.min(1, (x / graphWidth) * 2 - 1));
    const normY = Math.max(-1, Math.min(1, (1 - y / graphHeight) * 2 - 1));

    const color = getRandomColor();
    clicks.push({
        x: padding + (normX + 1) * (graphWidth / 2), // Convert back to canvas coordinates
        y: padding + (1 - normY) * (graphHeight / 2),
        color
    });

    const icon = `<span style="display:inline-block;width:12px;height:12px;background:${color};border-radius:50%;margin-right:8px;"></span>`;
    const line = `<div>${icon}x: ${normX.toFixed(2)}, y: ${normY.toFixed(2)}</div>`;
    resultsDiv.innerHTML += line;

    drawGraph();
});

resetButton.addEventListener("click", () => {
    clicks = [];
    resultsDiv.innerHTML = "";
    drawGraph();
});

annotationToggle.addEventListener("click", () => {
    showAnnotations = !showAnnotations;
    drawGraph();
});

// New adjective toggle functionality
adjectiveToggle.addEventListener("click", () => {
    showAdjectives = !showAdjectives;
    drawGraph();
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial draw
drawGraph();



//////////////////////////////////////////////////////////////////////////
// js for 'about.html' page = play around valence/arousal page ////////



