const pptxgen = require("pptxgenjs");

// ========================================
// COLOR PALETTE
// ========================================
const colors = {
  surface: "1E1E1E",      // Dark background
  text: "E0E0E0",         // Light text
  primary: "66B3FF",      // Blue headers
  secondary: "FF8A5B",    // Orange badges/buttons
  muted: "2A2A2A",        // Dark gray boxes
  correct: "2ECC71",      // Green correct
  correctBg: "1A4D2E",    // Dark green correct background
  incorrect: "FF9999",    // Red/Pink incorrect
  border: "555555",       // Gray borders
  shapeCorrect: "66B3FF", // Blue for correct answer shapes
  shapeIncorrect: "FF9999" // Red/Pink for incorrect answer shapes
};

// ========================================
// HELPER FUNCTIONS - 3D SHAPE DRAWING
// ========================================

// Draw a 3D cube (isometric view)
function drawCube(slide, x, y, size, color, label = "") {
  const depth = size * 0.4;

  // Front face (rectangle)
  slide.addShape("rect", {
    x: x,
    y: y + depth,
    w: size,
    h: size,
    fill: { color: color },
    line: { color: "000000", width: 1 }
  });

  // Top face (parallelogram approximation)
  slide.addShape("rect", {
    x: x + depth,
    y: y,
    w: size,
    h: depth,
    fill: { color: lightenColor(color, 20) },
    line: { color: "000000", width: 1 }
  });

  // Right face
  slide.addShape("rect", {
    x: x + size,
    y: y + depth,
    w: depth,
    h: size,
    fill: { color: darkenColor(color, 20) },
    line: { color: "000000", width: 1 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + size + depth + 0.05,
      w: size + depth,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// Draw a rectangular prism (box)
function drawRectangularPrism(slide, x, y, width, height, color, label = "") {
  const depth = width * 0.4;

  // Front face
  slide.addShape("rect", {
    x: x,
    y: y + depth,
    w: width,
    h: height,
    fill: { color: color },
    line: { color: "000000", width: 1 }
  });

  // Top face
  slide.addShape("rect", {
    x: x + depth,
    y: y,
    w: width,
    h: depth,
    fill: { color: lightenColor(color, 20) },
    line: { color: "000000", width: 1 }
  });

  // Right face
  slide.addShape("rect", {
    x: x + width,
    y: y + depth,
    w: depth,
    h: height,
    fill: { color: darkenColor(color, 20) },
    line: { color: "000000", width: 1 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + height + depth + 0.05,
      w: width + depth,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// Draw a cylinder (3D)
function drawCylinder(slide, x, y, height, width, color, label = "") {
  // Top ellipse
  slide.addShape("ellipse", {
    x: x,
    y: y,
    w: width,
    h: width * 0.3,
    fill: { color: lightenColor(color, 20) },
    line: { color: "000000", width: 1 }
  });

  // Body (rectangle)
  slide.addShape("rect", {
    x: x,
    y: y + (width * 0.15),
    w: width,
    h: height,
    fill: { color: color },
    line: { color: "000000", width: 0 }
  });

  // Bottom ellipse
  slide.addShape("ellipse", {
    x: x,
    y: y + height,
    w: width,
    h: width * 0.3,
    fill: { color: darkenColor(color, 10) },
    line: { color: "000000", width: 1 }
  });

  // Redraw left and right edges
  slide.addShape("line", {
    x: x,
    y: y + (width * 0.15),
    w: 0,
    h: height,
    line: { color: "000000", width: 1 }
  });

  slide.addShape("line", {
    x: x + width,
    y: y + (width * 0.15),
    w: 0,
    h: height,
    line: { color: "000000", width: 1 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + height + (width * 0.3) + 0.05,
      w: width,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// Draw a cone (3D)
function drawCone(slide, x, y, height, width, color, label = "") {
  // Base ellipse
  slide.addShape("ellipse", {
    x: x,
    y: y + height,
    w: width,
    h: width * 0.3,
    fill: { color: darkenColor(color, 10) },
    line: { color: "000000", width: 1 }
  });

  // Triangle body (approximation)
  slide.addShape("triangle", {
    x: x,
    y: y,
    w: width,
    h: height,
    fill: { color: color },
    line: { color: "000000", width: 1 },
    flipV: true
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + height + (width * 0.3) + 0.05,
      w: width,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// Draw a sphere (3D)
function drawSphere(slide, x, y, size, color, label = "") {
  // Main circle
  slide.addShape("ellipse", {
    x: x,
    y: y,
    w: size,
    h: size,
    fill: { color: color },
    line: { color: "000000", width: 1 }
  });

  // Highlight circle for 3D effect
  slide.addShape("ellipse", {
    x: x + size * 0.15,
    y: y + size * 0.15,
    w: size * 0.3,
    h: size * 0.3,
    fill: { color: lightenColor(color, 30), transparency: 50 },
    line: { width: 0 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + size + 0.05,
      w: size,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// Draw a pyramid (3D)
function drawPyramid(slide, x, y, height, width, color, label = "") {
  // Base square
  slide.addShape("rect", {
    x: x,
    y: y + height,
    w: width,
    h: width * 0.5,
    fill: { color: darkenColor(color, 20) },
    line: { color: "000000", width: 1 }
  });

  // Front triangle face
  slide.addShape("triangle", {
    x: x,
    y: y,
    w: width,
    h: height,
    fill: { color: color },
    line: { color: "000000", width: 1 },
    flipV: true
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + height + (width * 0.5) + 0.05,
      w: width,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// ========================================
// HELPER FUNCTIONS - 2D SHAPES
// ========================================

function drawRectangle(slide, x, y, width, height, color, label = "") {
  slide.addShape("rect", {
    x: x,
    y: y,
    w: width,
    h: height,
    fill: { color: color },
    line: { color: "000000", width: 1 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + height + 0.05,
      w: width,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

function drawCircle(slide, x, y, size, color, label = "") {
  slide.addShape("ellipse", {
    x: x,
    y: y,
    w: size,
    h: size,
    fill: { color: color },
    line: { color: "000000", width: 1 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + size + 0.05,
      w: size,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

function drawTriangle(slide, x, y, size, color, label = "") {
  slide.addShape("triangle", {
    x: x,
    y: y,
    w: size,
    h: size,
    fill: { color: color },
    line: { color: "000000", width: 1 }
  });

  if (label) {
    slide.addText(label, {
      x: x,
      y: y + size + 0.05,
      w: size,
      h: 0.2,
      fontSize: 10,
      color: colors.text,
      align: "center"
    });
  }
}

// ========================================
// COLOR UTILITIES
// ========================================

function lightenColor(color, percent) {
  const num = parseInt(color, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return (R << 16 | G << 8 | B).toString(16).padStart(6, '0');
}

function darkenColor(color, percent) {
  const num = parseInt(color, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
  const B = Math.max(0, (num & 0x0000FF) - amt);
  return (R << 16 | G << 8 | B).toString(16).padStart(6, '0');
}

// ========================================
// SLIDE BUILDING FUNCTIONS
// ========================================

function addQuestionHeader(slide, questionNum) {
  // Question badge
  slide.addText(`Q${questionNum}`, {
    x: 0.5,
    y: 0.3,
    w: 0.6,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.secondary },
    align: "center",
    valign: "middle"
  });
}

function addRevealHeader(slide, questionNum) {
  // Answer badge
  slide.addText(`Q${questionNum} - Answer`, {
    x: 0.5,
    y: 0.3,
    w: 1.5,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.correct },
    align: "center",
    valign: "middle"
  });
}

// ========================================
// QUESTION 1: 3D Shape Names
// ========================================

function createQuestion1(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };

  addQuestionHeader(slide, 1);

  // Question text
  slide.addText("Fill in the name of each 3-dimensional shape.", {
    x: 1.2,
    y: 0.35,
    w: 8,
    h: 0.4,
    fontSize: 18,
    color: colors.primary,
    bold: true
  });

  // Display shapes ONCE at top with labels (in correct answer order as hint)
  // Box, Pot, Shaker, Cabbage, Hat
  const shapeY = 1.0;
  const shapeSpacing = 1.6;

  // Box = Rectangular Prism
  drawRectangularPrism(slide, 0.7, shapeY, 0.5, 0.35, colors.shapeCorrect, "Box");

  // Pot = Cylinder
  drawCylinder(slide, 0.7 + shapeSpacing, shapeY - 0.05, 0.4, 0.45, colors.shapeCorrect, "Pot");

  // Shaker = Cone
  drawCone(slide, 0.7 + shapeSpacing * 2, shapeY - 0.05, 0.4, 0.45, colors.shapeCorrect, "Shaker");

  // Cabbage = Sphere
  drawSphere(slide, 0.7 + shapeSpacing * 3, shapeY, 0.45, colors.shapeCorrect, "Cabbage");

  // Hat = Cone
  drawCone(slide, 0.7 + shapeSpacing * 4, shapeY - 0.05, 0.4, 0.45, colors.shapeCorrect, "Hat");

  // Answer options - TEXT ONLY (no shape icons)
  const answerY = 2.5;
  const boxHeight = 0.75;

  // Answer A - INCORRECT
  slide.addShape("rect", {
    x: 0.5,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("A", {
    x: 0.6,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Cube, Cylinder, Cone, Sphere, Cone", {
    x: 1,
    y: answerY + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: colors.text,
    align: "left",
    valign: "middle"
  });

  // Answer B - CORRECT
  slide.addShape("rect", {
    x: 5.2,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("B", {
    x: 5.3,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeCorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Rectangular Prism, Cylinder, Cone, Sphere, Cone", {
    x: 5.7,
    y: answerY + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: colors.text,
    align: "left",
    valign: "middle"
  });

  // Answer C - INCORRECT
  const answerY2 = answerY + boxHeight + 0.2;
  slide.addShape("rect", {
    x: 0.5,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("C", {
    x: 0.6,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Rectangular Prism, Sphere, Cylinder, Cube, Cone", {
    x: 1,
    y: answerY2 + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: colors.text,
    align: "left",
    valign: "middle"
  });

  // Answer D - INCORRECT
  slide.addShape("rect", {
    x: 5.2,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("D", {
    x: 5.3,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Cube, Cylinder, Cube, Ball, Triangle", {
    x: 5.7,
    y: answerY2 + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: colors.text,
    align: "left",
    valign: "middle"
  });

  // Clickable areas - all link to reveal slide (slide 2)
  slide.addShape("rect", {
    x: 0.5,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 2 }
  });

  slide.addShape("rect", {
    x: 5.2,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 2 }
  });

  slide.addShape("rect", {
    x: 0.5,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 2 }
  });

  slide.addShape("rect", {
    x: 5.2,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 2 }
  });
}

function createReveal1(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };

  addRevealHeader(slide, 1);

  // Question text
  slide.addText("Fill in the name of each 3-dimensional shape.", {
    x: 2.2,
    y: 0.35,
    w: 7,
    h: 0.4,
    fontSize: 18,
    color: colors.primary,
    bold: true
  });

  // Display shapes at top (same as question slide)
  const shapeY = 1.0;
  const shapeSpacing = 1.6;

  // Box = Rectangular Prism
  drawRectangularPrism(slide, 0.7, shapeY, 0.5, 0.35, colors.shapeCorrect, "Box");

  // Pot = Cylinder
  drawCylinder(slide, 0.7 + shapeSpacing, shapeY - 0.05, 0.4, 0.45, colors.shapeCorrect, "Pot");

  // Shaker = Cone
  drawCone(slide, 0.7 + shapeSpacing * 2, shapeY - 0.05, 0.4, 0.45, colors.shapeCorrect, "Shaker");

  // Cabbage = Sphere
  drawSphere(slide, 0.7 + shapeSpacing * 3, shapeY, 0.45, colors.shapeCorrect, "Cabbage");

  // Hat = Cone
  drawCone(slide, 0.7 + shapeSpacing * 4, shapeY - 0.05, 0.4, 0.45, colors.shapeCorrect, "Hat");

  // Answer options - TEXT ONLY
  const answerY = 2.5;
  const boxHeight = 0.75;

  // Answer A - INCORRECT (dimmed)
  slide.addShape("rect", {
    x: 0.5,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("A", {
    x: 0.6,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Cube, Cylinder, Cone, Sphere, Cone", {
    x: 1,
    y: answerY + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: "888888",
    align: "left",
    valign: "middle"
  });

  // Answer B - CORRECT (highlighted in green)
  slide.addShape("rect", {
    x: 5.2,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.correctBg },
    line: { color: colors.correct, width: 3 }
  });
  slide.addText("B", {
    x: 5.3,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.correct },
    align: "center",
    valign: "middle"
  });
  slide.addText("✓ Rectangular Prism, Cylinder, Cone, Sphere, Cone", {
    x: 5.7,
    y: answerY + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: colors.correct,
    bold: true,
    align: "left",
    valign: "middle"
  });

  // Answer C - INCORRECT (dimmed)
  const answerY2 = answerY + boxHeight + 0.2;
  slide.addShape("rect", {
    x: 0.5,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("C", {
    x: 0.6,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Rectangular Prism, Sphere, Cylinder, Cube, Cone", {
    x: 1,
    y: answerY2 + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: "888888",
    align: "left",
    valign: "middle"
  });

  // Answer D - INCORRECT (dimmed)
  slide.addShape("rect", {
    x: 5.2,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("D", {
    x: 5.3,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Cube, Cylinder, Cube, Ball, Triangle", {
    x: 5.7,
    y: answerY2 + 0.2,
    w: 3.5,
    h: 0.4,
    fontSize: 13,
    color: "888888",
    align: "left",
    valign: "middle"
  });

  // Next question button
  slide.addShape("rect", {
    x: 7.5,
    y: 5,
    w: 2,
    h: 0.5,
    fill: { color: colors.secondary },
    line: { width: 0 }
  });
  slide.addText("Next Question →", {
    x: 7.5,
    y: 5,
    w: 2,
    h: 0.5,
    fontSize: 14,
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle",
    hyperlink: { slide: 3 }
  });
}

// ========================================
// QUESTION 2: Animal Composition
// ========================================

function drawAnimal1(slide, x, y, scale, color) {
  // Simple animal: circle head + triangle body + rectangle legs
  drawCircle(slide, x, y, 0.4 * scale, color);
  drawTriangle(slide, x - 0.1 * scale, y + 0.3 * scale, 0.6 * scale, color);
  drawRectangle(slide, x, y + 0.7 * scale, 0.1 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.25 * scale, y + 0.7 * scale, 0.1 * scale, 0.3 * scale, color);
}

function drawAnimal2(slide, x, y, scale, color) {
  // CAT: circle head + two triangle ears + rectangle body + four legs
  // Head (circle)
  drawCircle(slide, x + 0.15 * scale, y, 0.35 * scale, color);

  // Two triangle ears on top of head
  drawTriangle(slide, x + 0.12 * scale, y - 0.08 * scale, 0.15 * scale, color);
  drawTriangle(slide, x + 0.28 * scale, y - 0.08 * scale, 0.15 * scale, color);

  // Body (rectangle)
  drawRectangle(slide, x, y + 0.28 * scale, 0.6 * scale, 0.35 * scale, color);

  // Four legs (rectangles)
  drawRectangle(slide, x + 0.05 * scale, y + 0.6 * scale, 0.1 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.2 * scale, y + 0.6 * scale, 0.1 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.3 * scale, y + 0.6 * scale, 0.1 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.45 * scale, y + 0.6 * scale, 0.1 * scale, 0.3 * scale, color);
}

function drawAnimal3(slide, x, y, scale, color) {
  // Animal 3: Different composition
  drawRectangle(slide, x, y + 0.2 * scale, 0.5 * scale, 0.3 * scale, color);
  drawCircle(slide, x + 0.1 * scale, y, 0.3 * scale, color);
  drawRectangle(slide, x, y + 0.45 * scale, 0.1 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.35 * scale, y + 0.45 * scale, 0.1 * scale, 0.3 * scale, color);
}

function drawAnimal4(slide, x, y, scale, color) {
  // Animal 4: Yet another composition
  drawCircle(slide, x + 0.2 * scale, y + 0.1 * scale, 0.3 * scale, color);
  drawRectangle(slide, x, y + 0.35 * scale, 0.6 * scale, 0.35 * scale, color);
  drawTriangle(slide, x - 0.1 * scale, y + 0.6 * scale, 0.2 * scale, color);
}

function createQuestion2(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };

  addQuestionHeader(slide, 2);

  // Question text
  slide.addText("Draw how to make an animal using shapes. Which shows a correct animal?", {
    x: 1.2,
    y: 0.35,
    w: 8,
    h: 0.4,
    fontSize: 18,
    color: colors.primary,
    bold: true
  });

  const answerY = 1.5;
  const boxHeight = 1.5;

  // Answer A - INCORRECT
  slide.addShape("rect", {
    x: 0.5,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("A", {
    x: 0.6,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 1 (incorrect)", {
    x: 1,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: colors.text
  });
  drawAnimal1(slide, 2, answerY + 0.5, 1, colors.shapeIncorrect);

  // Answer B - CORRECT
  slide.addShape("rect", {
    x: 5.2,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("B", {
    x: 5.3,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeCorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 2 (Correct)", {
    x: 5.7,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: colors.text
  });
  drawAnimal2(slide, 6.5, answerY + 0.5, 1, colors.shapeCorrect);

  // Answer C - INCORRECT
  const answerY2 = answerY + boxHeight + 0.2;
  slide.addShape("rect", {
    x: 0.5,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("C", {
    x: 0.6,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 3 (incorrect)", {
    x: 1,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: colors.text
  });
  drawAnimal3(slide, 2, answerY2 + 0.5, 1, colors.shapeIncorrect);

  // Answer D - INCORRECT
  slide.addShape("rect", {
    x: 5.2,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("D", {
    x: 5.3,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 4 (incorrect)", {
    x: 5.7,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: colors.text
  });
  drawAnimal4(slide, 6.8, answerY2 + 0.5, 1, colors.shapeIncorrect);

  // Clickable areas
  slide.addShape("rect", {
    x: 0.5,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 4 }
  });

  slide.addShape("rect", {
    x: 5.2,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 4 }
  });

  slide.addShape("rect", {
    x: 0.5,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 4 }
  });

  slide.addShape("rect", {
    x: 5.2,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: "000000", transparency: 100 },
    line: { width: 0 },
    hyperlink: { slide: 4 }
  });
}

function createReveal2(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };

  addRevealHeader(slide, 2);

  // Question text
  slide.addText("Draw how to make an animal using shapes. Which shows a correct animal?", {
    x: 2.2,
    y: 0.35,
    w: 7,
    h: 0.4,
    fontSize: 18,
    color: colors.primary,
    bold: true
  });

  const answerY = 1.5;
  const boxHeight = 1.5;

  // Answer A - INCORRECT (dimmed)
  slide.addShape("rect", {
    x: 0.5,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("A", {
    x: 0.6,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 1 (incorrect)", {
    x: 1,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: "888888"
  });

  // Answer B - CORRECT (highlighted)
  slide.addShape("rect", {
    x: 5.2,
    y: answerY,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.correctBg },
    line: { color: colors.correct, width: 3 }
  });
  slide.addText("B", {
    x: 5.3,
    y: answerY + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.correct },
    align: "center",
    valign: "middle"
  });
  slide.addText("✓ Animal arrangement 2 (Correct)", {
    x: 5.7,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: colors.correct,
    bold: true
  });
  drawAnimal2(slide, 6.5, answerY + 0.5, 1, colors.shapeCorrect);

  // Answer C - INCORRECT (dimmed)
  const answerY2 = answerY + boxHeight + 0.2;
  slide.addShape("rect", {
    x: 0.5,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("C", {
    x: 0.6,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 3 (incorrect)", {
    x: 1,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: "888888"
  });

  // Answer D - INCORRECT (dimmed)
  slide.addShape("rect", {
    x: 5.2,
    y: answerY2,
    w: 4.2,
    h: boxHeight,
    fill: { color: colors.muted },
    line: { color: colors.border, width: 1 }
  });
  slide.addText("D", {
    x: 5.3,
    y: answerY2 + 0.1,
    w: 0.3,
    h: 0.3,
    fontSize: 16,
    bold: true,
    color: "FFFFFF",
    fill: { color: colors.shapeIncorrect },
    align: "center",
    valign: "middle"
  });
  slide.addText("Animal arrangement 4 (incorrect)", {
    x: 5.7,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.3,
    fontSize: 12,
    color: "888888"
  });

  // Next question button
  slide.addShape("rect", {
    x: 7.5,
    y: 5,
    w: 2,
    h: 0.5,
    fill: { color: colors.secondary },
    line: { width: 0 }
  });
  slide.addText("Next Question →", {
    x: 7.5,
    y: 5,
    w: 2,
    h: 0.5,
    fontSize: 14,
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle",
    hyperlink: { slide: 5 }
  });
}

// ========================================
// QUESTION 3: Robot Composition
// ========================================

function drawRobot1(slide, x, y, scale, color) {
  // Robot 1: square head + rectangle body + rectangle legs
  drawRectangle(slide, x + 0.1 * scale, y, 0.3 * scale, 0.3 * scale, color);
  drawRectangle(slide, x, y + 0.3 * scale, 0.5 * scale, 0.4 * scale, color);
  drawRectangle(slide, x + 0.05 * scale, y + 0.7 * scale, 0.15 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.3 * scale, y + 0.7 * scale, 0.15 * scale, 0.3 * scale, color);
}

function drawRobot2(slide, x, y, scale, color) {
  // Robot 2: rectangle head + square body + rectangle arms + rectangle legs (CORRECT)
  drawRectangle(slide, x + 0.15 * scale, y, 0.3 * scale, 0.25 * scale, color);
  drawRectangle(slide, x + 0.1 * scale, y + 0.25 * scale, 0.4 * scale, 0.4 * scale, color);
  // Arms
  drawRectangle(slide, x - 0.05 * scale, y + 0.3 * scale, 0.15 * scale, 0.08 * scale, color);
  drawRectangle(slide, x + 0.5 * scale, y + 0.3 * scale, 0.15 * scale, 0.08 * scale, color);
  // Legs
  drawRectangle(slide, x + 0.15 * scale, y + 0.65 * scale, 0.12 * scale, 0.3 * scale, color);
  drawRectangle(slide, x + 0.33 * scale, y + 0.65 * scale, 0.12 * scale, 0.3 * scale, color);
}

function drawRobot3(slide, x, y, scale, color) {
  // Robot 3
  drawCircle(slide, x + 0.1 * scale, y, 0.3 * scale, color);
  drawRectangle(slide, x, y + 0.3 * scale, 0.5 * scale, 0.35 * scale, color);
  drawRectangle(slide, x + 0.1 * scale, y + 0.65 * scale, 0.12 * scale, 0.25 * scale, color);
  drawRectangle(slide, x + 0.28 * scale, y + 0.65 * scale, 0.12 * scale, 0.25 * scale, color);
}

function drawRobot4(slide, x, y, scale, color) {
  // Robot 4
  drawRectangle(slide, x + 0.1 * scale, y, 0.25 * scale, 0.25 * scale, color);
  drawRectangle(slide, x + 0.05 * scale, y + 0.25 * scale, 0.35 * scale, 0.4 * scale, color);
  drawRectangle(slide, x + 0.05 * scale, y + 0.65 * scale, 0.1 * scale, 0.25 * scale, color);
  drawRectangle(slide, x + 0.3 * scale, y + 0.65 * scale, 0.1 * scale, 0.25 * scale, color);
}

function createQuestion3(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };
  addQuestionHeader(slide, 3);

  slide.addText("Draw how to make a robot using shapes. Which shows a correct robot?", {
    x: 1.2, y: 0.35, w: 8, h: 0.4, fontSize: 18, color: colors.primary, bold: true
  });

  const answerY = 1.5, boxHeight = 1.5;

  // Answer A - INCORRECT
  slide.addShape("rect", { x: 0.5, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("A", { x: 0.6, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
  slide.addText("Robot arrangement 1 (incorrect)", { x: 1, y: answerY + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawRobot1(slide, 2, answerY + 0.5, 1, colors.shapeIncorrect);

  // Answer B - CORRECT
  slide.addShape("rect", { x: 5.2, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("B", { x: 5.3, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeCorrect }, align: "center", valign: "middle" });
  slide.addText("Robot arrangement 2 (Correct)", { x: 5.7, y: answerY + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawRobot2(slide, 6.5, answerY + 0.5, 1, colors.shapeCorrect);

  // Answer C - INCORRECT
  const answerY2 = answerY + boxHeight + 0.2;
  slide.addShape("rect", { x: 0.5, y: answerY2, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("C", { x: 0.6, y: answerY2 + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
  slide.addText("Robot arrangement 3 (incorrect)", { x: 1, y: answerY2 + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawRobot3(slide, 2, answerY2 + 0.5, 1, colors.shapeIncorrect);

  // Answer D - INCORRECT
  slide.addShape("rect", { x: 5.2, y: answerY2, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("D", { x: 5.3, y: answerY2 + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
  slide.addText("Robot arrangement 4 (incorrect)", { x: 5.7, y: answerY2 + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawRobot4(slide, 6.8, answerY2 + 0.5, 1, colors.shapeIncorrect);

  // Clickable areas
  [{ x: 0.5, y: answerY }, { x: 5.2, y: answerY }, { x: 0.5, y: answerY2 }, { x: 5.2, y: answerY2 }].forEach(area => {
    slide.addShape("rect", { ...area, w: 4.2, h: boxHeight, fill: { color: "000000", transparency: 100 }, line: { width: 0 }, hyperlink: { slide: 6 } });
  });
}

function createReveal3(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };
  addRevealHeader(slide, 3);

  slide.addText("Draw how to make a robot using shapes. Which shows a correct robot?", {
    x: 2.2, y: 0.35, w: 7, h: 0.4, fontSize: 18, color: colors.primary, bold: true
  });

  const answerY = 1.5, boxHeight = 1.5;

  // Answer B - CORRECT (highlighted)
  slide.addShape("rect", { x: 5.2, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.correctBg }, line: { color: colors.correct, width: 3 } });
  slide.addText("B", { x: 5.3, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.correct }, align: "center", valign: "middle" });
  slide.addText("✓ Robot arrangement 2 (Correct)", { x: 5.7, y: answerY + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.correct, bold: true });
  drawRobot2(slide, 6.5, answerY + 0.5, 1, colors.shapeCorrect);

  // Next question button
  slide.addShape("rect", { x: 7.5, y: 5, w: 2, h: 0.5, fill: { color: colors.secondary }, line: { width: 0 } });
  slide.addText("Next Question →", { x: 7.5, y: 5, w: 2, h: 0.5, fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle", hyperlink: { slide: 7 } });
}

// ========================================
// QUESTION 4: 3 Cubes Configuration
// ========================================

function createQuestion4(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };
  addQuestionHeader(slide, 4);

  slide.addText("Put all the shapes together. Circle the shape they can make. (3 cubes)", {
    x: 1.2, y: 0.35, w: 8, h: 0.4, fontSize: 18, color: colors.primary, bold: true
  });

  // Show the 3 BASE CUBES at the top
  slide.addText("Given shapes:", {
    x: 1, y: 0.9, w: 2, h: 0.3, fontSize: 14, color: colors.text, italic: true
  });
  drawCube(slide, 1, 1.15, 0.45, colors.shapeCorrect);
  drawCube(slide, 1.7, 1.15, 0.45, colors.shapeCorrect);
  drawCube(slide, 2.4, 1.15, 0.45, colors.shapeCorrect);

  const answerY = 2.2, boxHeight = 1.3;

  // Answer A - Single cube
  slide.addShape("rect", { x: 0.5, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("A", { x: 0.6, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
  slide.addText("Single cube", { x: 1, y: answerY + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawCube(slide, 2, answerY + 0.4, 0.5, colors.shapeIncorrect);

  // Answer B - L-shaped configuration (CORRECT)
  slide.addShape("rect", { x: 5.2, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("B", { x: 5.3, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeCorrect }, align: "center", valign: "middle" });
  slide.addText("L-shaped configuration", { x: 5.7, y: answerY + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawCube(slide, 6.2, answerY + 0.4, 0.4, colors.shapeCorrect);
  drawCube(slide, 6.6, answerY + 0.4, 0.4, colors.shapeCorrect);
  drawCube(slide, 6.6, answerY + 0.56, 0.4, colors.shapeCorrect);

  // Answer C - Straight line
  const answerY2 = answerY + boxHeight + 0.2;
  slide.addShape("rect", { x: 0.5, y: answerY2, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("C", { x: 0.6, y: answerY2 + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
  slide.addText("Straight line", { x: 1, y: answerY2 + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawCube(slide, 1.5, answerY2 + 0.4, 0.4, colors.shapeIncorrect);
  drawCube(slide, 1.9, answerY2 + 0.4, 0.4, colors.shapeIncorrect);
  drawCube(slide, 2.3, answerY2 + 0.4, 0.4, colors.shapeIncorrect);

  // Answer D - T-shaped
  slide.addShape("rect", { x: 5.2, y: answerY2, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("D", { x: 5.3, y: answerY2 + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
  slide.addText("T-shaped configuration", { x: 5.7, y: answerY2 + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.text });
  drawCube(slide, 6.6, answerY2 + 0.4, 0.4, colors.shapeIncorrect);
  drawCube(slide, 6.6, answerY2 + 0.56, 0.4, colors.shapeIncorrect);
  drawCube(slide, 7.0, answerY2 + 0.56, 0.4, colors.shapeIncorrect);

  // Clickable areas
  [{ x: 0.5, y: answerY }, { x: 5.2, y: answerY }, { x: 0.5, y: answerY2 }, { x: 5.2, y: answerY2 }].forEach(area => {
    slide.addShape("rect", { ...area, w: 4.2, h: boxHeight, fill: { color: "000000", transparency: 100 }, line: { width: 0 }, hyperlink: { slide: 8 } });
  });
}

function createReveal4(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };
  addRevealHeader(slide, 4);

  slide.addText("Put all the shapes together. Circle the shape they can make. (3 cubes)", {
    x: 2.2, y: 0.35, w: 7, h: 0.4, fontSize: 18, color: colors.primary, bold: true
  });

  // Show the 3 BASE CUBES
  slide.addText("Given shapes:", {
    x: 1, y: 0.9, w: 2, h: 0.3, fontSize: 14, color: colors.text, italic: true
  });
  drawCube(slide, 1, 1.15, 0.45, colors.shapeCorrect);
  drawCube(slide, 1.7, 1.15, 0.45, colors.shapeCorrect);
  drawCube(slide, 2.4, 1.15, 0.45, colors.shapeCorrect);

  const answerY = 2.2, boxHeight = 1.3;

  // Answer B - CORRECT
  slide.addShape("rect", { x: 5.2, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.correctBg }, line: { color: colors.correct, width: 3 } });
  slide.addText("B", { x: 5.3, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.correct }, align: "center", valign: "middle" });
  slide.addText("✓ L-shaped configuration", { x: 5.7, y: answerY + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: colors.correct, bold: true });
  drawCube(slide, 6.2, answerY + 0.4, 0.4, colors.shapeCorrect);
  drawCube(slide, 6.6, answerY + 0.4, 0.4, colors.shapeCorrect);
  drawCube(slide, 6.6, answerY + 0.56, 0.4, colors.shapeCorrect);

  // Next question button
  slide.addShape("rect", { x: 7.5, y: 5, w: 2, h: 0.5, fill: { color: colors.secondary }, line: { width: 0 } });
  slide.addText("Next Question →", { x: 7.5, y: 5, w: 2, h: 0.5, fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle", hyperlink: { slide: 9 } });
}

// ========================================
// QUESTIONS 5-15 (Simplified for now)
// ========================================

function createQuestionYesNo(ppt, qNum, question, correctAnswer, revealSlide, showShapes = false) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };
  addQuestionHeader(slide, qNum);

  slide.addText(question, { x: 1.2, y: 0.35, w: 8, h: 0.5, fontSize: 18, color: colors.primary, bold: true });

  // Show shapes if needed (for Q5)
  if (showShapes && qNum === 5) {
    // Shape A: Triangle + Rectangle
    slide.addText("Shape A:", { x: 1, y: 1.2, w: 1.5, h: 0.3, fontSize: 14, color: colors.text, bold: true });
    drawTriangle(slide, 1.2, 1.5, 0.5, colors.shapeCorrect);
    drawRectangle(slide, 1.5, 1.7, 0.6, 0.3, colors.shapeCorrect);

    // Shape B: Different configuration
    slide.addText("Shape B:", { x: 3.5, y: 1.2, w: 1.5, h: 0.3, fontSize: 14, color: colors.text, bold: true });
    drawRectangle(slide, 3.7, 1.5, 0.8, 0.5, colors.shapeCorrect);
  }

  const answerY = showShapes ? 2.8 : 2.5;
  const boxHeight = 1;
  const yesColor = correctAnswer === "Yes" ? colors.shapeCorrect : colors.shapeIncorrect;
  const noColor = correctAnswer === "No" ? colors.shapeCorrect : colors.shapeIncorrect;

  // Yes
  slide.addShape("rect", { x: 2, y: answerY, w: 2.5, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("A", { x: 2.1, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: yesColor }, align: "center", valign: "middle" });
  slide.addText("Yes", { x: 2.5, y: answerY + 0.35, w: 1.8, h: 0.4, fontSize: 16, color: colors.text, align: "center", valign: "middle" });

  // No
  slide.addShape("rect", { x: 5.5, y: answerY, w: 2.5, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  slide.addText("B", { x: 5.6, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: noColor }, align: "center", valign: "middle" });
  slide.addText("No", { x: 6, y: answerY + 0.35, w: 1.8, h: 0.4, fontSize: 16, color: colors.text, align: "center", valign: "middle" });

  // Clickable areas
  slide.addShape("rect", { x: 2, y: answerY, w: 2.5, h: boxHeight, fill: { color: "000000", transparency: 100 }, line: { width: 0 }, hyperlink: { slide: revealSlide } });
  slide.addShape("rect", { x: 5.5, y: answerY, w: 2.5, h: boxHeight, fill: { color: "000000", transparency: 100 }, line: { width: 0 }, hyperlink: { slide: revealSlide } });
}

function createRevealYesNo(ppt, qNum, question, correctAnswer, nextSlide) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };
  addRevealHeader(slide, qNum);

  slide.addText(question, { x: 2.2, y: 0.35, w: 7, h: 0.5, fontSize: 18, color: colors.primary, bold: true });

  const answerY = 2.5, boxHeight = 1;

  if (correctAnswer === "Yes") {
    // Yes - CORRECT
    slide.addShape("rect", { x: 2, y: answerY, w: 2.5, h: boxHeight, fill: { color: colors.correctBg }, line: { color: colors.correct, width: 3 } });
    slide.addText("A", { x: 2.1, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.correct }, align: "center", valign: "middle" });
    slide.addText("✓ Yes", { x: 2.5, y: answerY + 0.35, w: 1.8, h: 0.4, fontSize: 16, color: colors.correct, bold: true, align: "center", valign: "middle" });

    // No - INCORRECT
    slide.addShape("rect", { x: 5.5, y: answerY, w: 2.5, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
    slide.addText("B", { x: 5.6, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
    slide.addText("No", { x: 6, y: answerY + 0.35, w: 1.8, h: 0.4, fontSize: 16, color: "888888", align: "center", valign: "middle" });
  } else {
    // Yes - INCORRECT
    slide.addShape("rect", { x: 2, y: answerY, w: 2.5, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
    slide.addText("A", { x: 2.1, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.shapeIncorrect }, align: "center", valign: "middle" });
    slide.addText("Yes", { x: 2.5, y: answerY + 0.35, w: 1.8, h: 0.4, fontSize: 16, color: "888888", align: "center", valign: "middle" });

    // No - CORRECT
    slide.addShape("rect", { x: 5.5, y: answerY, w: 2.5, h: boxHeight, fill: { color: colors.correctBg }, line: { color: colors.correct, width: 3 } });
    slide.addText("B", { x: 5.6, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.correct }, align: "center", valign: "middle" });
    slide.addText("✓ No", { x: 6, y: answerY + 0.35, w: 1.8, h: 0.4, fontSize: 16, color: colors.correct, bold: true, align: "center", valign: "middle" });
  }

  // Next question button
  slide.addShape("rect", { x: 7.5, y: 5, w: 2, h: 0.5, fill: { color: colors.secondary }, line: { width: 0 } });
  slide.addText("Next Question →", { x: 7.5, y: 5, w: 2, h: 0.5, fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle", hyperlink: { slide: nextSlide } });
}

// ========================================
// QUESTION 6: Hexagon + Triangle Transformation
// ========================================

function create4OptionGeneric(ppt, qNum, question, options, correctIndex, revealSlide, nextSlide) {
  // Question slide
  const qSlide = ppt.addSlide();
  qSlide.background = { color: colors.surface };
  addQuestionHeader(qSlide, qNum);
  qSlide.addText(question, { x: 1.2, y: 0.35, w: 8, h: 0.4, fontSize: 18, color: colors.primary, bold: true });

  const answerY = 1.8, boxHeight = 1.1;

  // Answer A
  const isACorrect = correctIndex === 0;
  qSlide.addShape("rect", { x: 0.5, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  qSlide.addText("A", { x: 0.6, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: isACorrect ? colors.shapeCorrect : colors.shapeIncorrect }, align: "center", valign: "middle" });
  qSlide.addText(options[0], { x: 1, y: answerY + 0.4, w: 3.5, h: 0.5, fontSize: 12, color: colors.text, align: "center", valign: "middle" });

  // Answer B
  const isBCorrect = correctIndex === 1;
  qSlide.addShape("rect", { x: 5.2, y: answerY, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  qSlide.addText("B", { x: 5.3, y: answerY + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: isBCorrect ? colors.shapeCorrect : colors.shapeIncorrect }, align: "center", valign: "middle" });
  qSlide.addText(options[1], { x: 5.7, y: answerY + 0.4, w: 3.5, h: 0.5, fontSize: 12, color: colors.text, align: "center", valign: "middle" });

  // Answer C
  const answerY2 = answerY + boxHeight + 0.2;
  const isCCorrect = correctIndex === 2;
  qSlide.addShape("rect", { x: 0.5, y: answerY2, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  qSlide.addText("C", { x: 0.6, y: answerY2 + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: isCCorrect ? colors.shapeCorrect : colors.shapeIncorrect }, align: "center", valign: "middle" });
  qSlide.addText(options[2], { x: 1, y: answerY2 + 0.4, w: 3.5, h: 0.5, fontSize: 12, color: colors.text, align: "center", valign: "middle" });

  // Answer D
  const isDCorrect = correctIndex === 3;
  qSlide.addShape("rect", { x: 5.2, y: answerY2, w: 4.2, h: boxHeight, fill: { color: colors.muted }, line: { color: colors.border, width: 1 } });
  qSlide.addText("D", { x: 5.3, y: answerY2 + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: isDCorrect ? colors.shapeCorrect : colors.shapeIncorrect }, align: "center", valign: "middle" });
  qSlide.addText(options[3], { x: 5.7, y: answerY2 + 0.4, w: 3.5, h: 0.5, fontSize: 12, color: colors.text, align: "center", valign: "middle" });

  // Clickable areas
  [{ x: 0.5, y: answerY }, { x: 5.2, y: answerY }, { x: 0.5, y: answerY2 }, { x: 5.2, y: answerY2 }].forEach(area => {
    qSlide.addShape("rect", { ...area, w: 4.2, h: boxHeight, fill: { color: "000000", transparency: 100 }, line: { width: 0 }, hyperlink: { slide: revealSlide } });
  });

  // Reveal slide
  const rSlide = ppt.addSlide();
  rSlide.background = { color: colors.surface };
  addRevealHeader(rSlide, qNum);
  rSlide.addText(question, { x: 2.2, y: 0.35, w: 7, h: 0.4, fontSize: 18, color: colors.primary, bold: true });

  const correctLetter = ["A", "B", "C", "D"][correctIndex];
  const yPos = correctIndex < 2 ? answerY : answerY2;
  const xPos = (correctIndex % 2 === 0) ? 0.5 : 5.2;

  rSlide.addShape("rect", { x: xPos, y: yPos, w: 4.2, h: boxHeight, fill: { color: colors.correctBg }, line: { color: colors.correct, width: 3 } });
  rSlide.addText(correctLetter, { x: xPos + 0.1, y: yPos + 0.1, w: 0.3, h: 0.3, fontSize: 16, bold: true, color: "FFFFFF", fill: { color: colors.correct }, align: "center", valign: "middle" });
  rSlide.addText("✓ " + options[correctIndex], { x: xPos + 0.5, y: yPos + 0.4, w: 3.5, h: 0.5, fontSize: 12, color: colors.correct, bold: true, align: "center", valign: "middle" });

  // Next button
  rSlide.addShape("rect", { x: 7.5, y: 5, w: 2, h: 0.5, fill: { color: colors.secondary }, line: { width: 0 } });
  rSlide.addText("Next Question →", { x: 7.5, y: 5, w: 2, h: 0.5, fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle", hyperlink: { slide: nextSlide } });
}

// ========================================
// ANSWER KEY
// ========================================

function createAnswerKey(ppt) {
  const slide = ppt.addSlide();
  slide.background = { color: colors.surface };

  slide.addText("ANSWER KEY", {
    x: 3,
    y: 1,
    w: 4,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: colors.primary,
    align: "center"
  });

  const answers = `Q1: B    Q6: B    Q11: A
Q2: B    Q7: C    Q12: B
Q3: B    Q8: A    Q13: B
Q4: B    Q9: D    Q14: B
Q5: B    Q10: C   Q15: C`;

  slide.addText(answers, {
    x: 2,
    y: 2.5,
    w: 6,
    h: 3,
    fontSize: 20,
    color: colors.text,
    fontFace: "Courier New",
    align: "center",
    valign: "middle"
  });
}

// ========================================
// MAIN EXECUTION
// ========================================

const ppt = new pptxgen();

// Set presentation properties
ppt.layout = "LAYOUT_16x9";
ppt.author = "Math Shapes Quiz";
ppt.title = "1st Grade Geometry Quiz";

// Create all 31 slides
console.log("Generating slides...");

// Q1 + R1
createQuestion1(ppt);
createReveal1(ppt);

// Q2 + R2
createQuestion2(ppt);
createReveal2(ppt);

// Q3 + R3
createQuestion3(ppt);
createReveal3(ppt);

// Q4 + R4
createQuestion4(ppt);
createReveal4(ppt);

// Q5 + R5
createQuestionYesNo(ppt, 5, "Can the parts of Shape A be used to make Shape B?", "No", 10, true);
createRevealYesNo(ppt, 5, "Can the parts of Shape A be used to make Shape B?", "No", 11);

// Q6 - Transformation: Hexagon + Triangle (Answer: B)
create4OptionGeneric(ppt, 6, "How can you make a different shape using the same parts? (Hexagon + Triangle)",
  ["Transformation 1", "Transformation 2 (Correct)", "Transformation 3", "Transformation 4"], 1, 12, 13);

// Q7 - Transformation: Parallelogram + Square (Answer: C)
create4OptionGeneric(ppt, 7, "How can you make a different shape using the same parts? (Parallelogram + Square)",
  ["Transformation 1", "Transformation 2", "Transformation 3 (Correct)", "Transformation 4"], 2, 14, 15);

// Q8 - Yes/No Decomposition (Answer: A/Yes)
createQuestionYesNo(ppt, 8, "Can the parts of Shape A be used to make Shape B? (Diamond shape)", "Yes", 16);
createRevealYesNo(ppt, 8, "Can the parts of Shape A be used to make Shape B? (Diamond shape)", "Yes", 17);

// Q9 - Attribute Matching (Answer: D)
create4OptionGeneric(ppt, 9, "How do you know the shape is NOT a rectangle? Match with one reason only.",
  ["Shape is not closed", "Shape has more than 4 sides", "Shape is not 2-dimensional", "Shape has fewer than 4 sides (Correct)"], 3, 18, 19);

// Q10 - Rectangle from L-Shape (Answer: C)
create4OptionGeneric(ppt, 10, "How can you use the parts of this shape to make a rectangle? (L-shaped figure)",
  ["Configuration 1", "Configuration 2", "Configuration 3 (Correct)", "Configuration 4"], 2, 20, 21);

// Q11 - Cylinder + Cone (Answer: A)
create4OptionGeneric(ppt, 11, "Put all the shapes together. Circle the shape they can make. (Cylinder + Cone)",
  ["Stacked cylinder and cone (Correct)", "Merged into sphere", "Separate shapes", "Different configuration"], 0, 22, 23);

// Q12 + R12 - Cone to Pyramid (Answer: B/No)
createQuestionYesNo(ppt, 12, "Can you make Shape B from Shape A? (Cone → Pyramid)", "No", 24);
createRevealYesNo(ppt, 12, "Can you make Shape B from Shape A? (Cone → Pyramid)", "No", 25);

// Q13 + R13 - T-Shaped Blocks (Answer: B/No)
createQuestionYesNo(ppt, 13, "Can you make Shape B from Shape A? (T-shaped blocks)", "No", 26);
createRevealYesNo(ppt, 13, "Can you make Shape B from Shape A? (T-shaped blocks)", "No", 27);

// Q14 - Real-World 3D Shapes (Answer: B)
create4OptionGeneric(ppt, 14, "What 3 items around you are 3-dimensional shapes?",
  ["Ball=Sphere, Cup=Cylinder, Book=Cube", "Pencil=Cylinder, Box=Rectangular Prism, Basketball=Sphere (Correct)", "Hat=Cone, Can=Cube, Ball=Circle", "Block=Rectangular Prism, Apple=Sphere, Crayon=Prism"], 1, 28, 29);

// Q15 - Animal Composition (Answer: C - DIFFERENT from Q2)
create4OptionGeneric(ppt, 15, "Draw how to make an animal using shapes. Which shows a correct animal?",
  ["Animal arrangement 1", "Animal arrangement 2", "Animal arrangement 3 (Correct)", "Animal arrangement 4"], 2, 30, 31);

// Answer Key (Slide 31)
createAnswerKey(ppt);

// Save the presentation
ppt.writeFile({ fileName: "math-shapes-quiz-complete.pptx" })
  .then(() => {
    console.log("✓ PowerPoint created successfully: math-shapes-quiz-complete.pptx");
    console.log("✓ Generated 31 slides total");
    console.log("✓ Questions 1-15 + Reveals + Answer Key");
    console.log("✓ All slides use native PowerPoint shapes (no SVG/HTML conversion)");
    console.log("✓ Dark mode styling applied (#1E1E1E background)");
    console.log("✓ Interactive hyperlinks configured");
  })
  .catch((err) => {
    console.error("Error creating PowerPoint:", err);
  });
