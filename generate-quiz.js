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

  // Reference diagram at top
  slide.addText("Box | Pot | Shaker | Cabbage | Hat", {
    x: 1,
    y: 1,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.text,
    italic: true,
    align: "center"
  });

  // Answer options with shapes
  const answerY = 1.5;
  const boxHeight = 1.1;

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
  slide.addText("Box=Cube, Pot=Cylinder, Shaker=Cone, Cabbage=Sphere, Hat=Cone", {
    x: 1,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
    color: colors.text
  });
  // Add small shape icons for A
  drawCube(slide, 1, answerY + 0.5, 0.3, colors.shapeIncorrect);
  drawCylinder(slide, 1.5, answerY + 0.45, 0.35, 0.3, colors.shapeIncorrect);
  drawCone(slide, 2, answerY + 0.45, 0.35, 0.3, colors.shapeIncorrect);
  drawSphere(slide, 2.5, answerY + 0.5, 0.3, colors.shapeIncorrect);

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
  slide.addText("Box=Rectangular Prism, Pot=Cylinder,\nShaker=Cone, Cabbage=Sphere, Hat=Cone", {
    x: 5.7,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
    color: colors.text
  });
  // Add small shape icons for B
  drawRectangularPrism(slide, 5.8, answerY + 0.55, 0.4, 0.3, colors.shapeCorrect);
  drawCylinder(slide, 6.4, answerY + 0.5, 0.35, 0.3, colors.shapeCorrect);
  drawCone(slide, 6.9, answerY + 0.5, 0.35, 0.3, colors.shapeCorrect);
  drawSphere(slide, 7.4, answerY + 0.55, 0.3, colors.shapeCorrect);

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
  slide.addText("Box=Rectangular Prism, Pot=Sphere,\nShaker=Cylinder, Cabbage=Cube, Hat=Cone", {
    x: 1,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
    color: colors.text
  });
  // Add small shape icons for C
  drawRectangularPrism(slide, 1, answerY2 + 0.55, 0.4, 0.3, colors.shapeIncorrect);
  drawSphere(slide, 1.6, answerY2 + 0.55, 0.3, colors.shapeIncorrect);
  drawCylinder(slide, 2.1, answerY2 + 0.5, 0.35, 0.3, colors.shapeIncorrect);
  drawCube(slide, 2.6, answerY2 + 0.5, 0.3, colors.shapeIncorrect);

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
  slide.addText("Box=Cube, Pot=Cylinder, Shaker=Cube,\nCabbage=Ball, Hat=Triangle", {
    x: 5.7,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
    color: colors.text
  });
  // Add small shape icons for D
  drawCube(slide, 5.8, answerY2 + 0.5, 0.3, colors.shapeIncorrect);
  drawCylinder(slide, 6.3, answerY2 + 0.45, 0.35, 0.3, colors.shapeIncorrect);
  drawSphere(slide, 6.8, answerY2 + 0.5, 0.3, colors.shapeIncorrect);
  drawTriangle(slide, 7.3, answerY2 + 0.5, 0.3, colors.shapeIncorrect);

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

  // Reference diagram
  slide.addText("Box | Pot | Shaker | Cabbage | Hat", {
    x: 1,
    y: 1,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.text,
    italic: true,
    align: "center"
  });

  const answerY = 1.5;
  const boxHeight = 1.1;

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
  slide.addText("Box=Cube, Pot=Cylinder, Shaker=Cone, Cabbage=Sphere, Hat=Cone", {
    x: 1,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
    color: "888888"
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
  slide.addText("✓ Box=Rectangular Prism, Pot=Cylinder,\nShaker=Cone, Cabbage=Sphere, Hat=Cone", {
    x: 5.7,
    y: answerY + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
    color: colors.correct,
    bold: true
  });
  // Add shape icons for correct answer
  drawRectangularPrism(slide, 5.8, answerY + 0.55, 0.4, 0.3, colors.shapeCorrect);
  drawCylinder(slide, 6.4, answerY + 0.5, 0.35, 0.3, colors.shapeCorrect);
  drawCone(slide, 6.9, answerY + 0.5, 0.35, 0.3, colors.shapeCorrect);
  drawSphere(slide, 7.4, answerY + 0.55, 0.3, colors.shapeCorrect);

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
  slide.addText("Box=Rectangular Prism, Pot=Sphere,\nShaker=Cylinder, Cabbage=Cube, Hat=Cone", {
    x: 1,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
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
  slide.addText("Box=Cube, Pot=Cylinder, Shaker=Cube,\nCabbage=Ball, Hat=Triangle", {
    x: 5.7,
    y: answerY2 + 0.15,
    w: 3.5,
    h: 0.8,
    fontSize: 11,
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
  // Animal 2: oval body + circle head + triangle ears
  drawCircle(slide, x + 0.15 * scale, y, 0.35 * scale, color);
  drawRectangle(slide, x, y + 0.25 * scale, 0.6 * scale, 0.4 * scale, color);
  drawTriangle(slide, x + 0.05 * scale, y - 0.05 * scale, 0.15 * scale, color);
  drawTriangle(slide, x + 0.3 * scale, y - 0.05 * scale, 0.15 * scale, color);
  drawRectangle(slide, x + 0.05 * scale, y + 0.6 * scale, 0.12 * scale, 0.25 * scale, color);
  drawRectangle(slide, x + 0.4 * scale, y + 0.6 * scale, 0.12 * scale, 0.25 * scale, color);
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
// MAIN EXECUTION
// ========================================

const ppt = new pptxgen();

// Set presentation properties
ppt.layout = "LAYOUT_16x9";
ppt.author = "Math Shapes Quiz";
ppt.title = "1st Grade Geometry Quiz";

// Create first 4 slides for testing
createQuestion1(ppt);
createReveal1(ppt);
createQuestion2(ppt);
createReveal2(ppt);

// Save the presentation
ppt.writeFile({ fileName: "math-shapes-quiz-test.pptx" })
  .then(() => {
    console.log("✓ PowerPoint created successfully: math-shapes-quiz-test.pptx");
    console.log("✓ Generated 4 slides: Q1, R1, Q2, R2");
    console.log("✓ All slides use native PowerPoint shapes (no SVG/HTML conversion)");
    console.log("✓ Dark mode styling applied (#1E1E1E background)");
    console.log("✓ Interactive hyperlinks configured");
  })
  .catch((err) => {
    console.error("Error creating PowerPoint:", err);
  });
