const pptxgen = require("pptxgenjs");

const ppt = new pptxgen();
ppt.layout = "LAYOUT_16x9";

const slide = ppt.addSlide();
slide.background = { color: "1E1E1E" };

// Test 1: Simple rectangle
slide.addShape("rect", {
  x: 1,
  y: 1,
  w: 2,
  h: 1,
  fill: { color: "FF0000" },
  line: { color: "000000", width: 2 }
});

slide.addText("RED RECTANGLE - Can you see this shape?", {
  x: 1,
  y: 2.2,
  w: 2,
  h: 0.3,
  fontSize: 14,
  color: "FFFFFF"
});

// Test 2: Simple circle
slide.addShape("ellipse", {
  x: 4,
  y: 1,
  w: 1.5,
  h: 1.5,
  fill: { color: "00FF00" },
  line: { color: "000000", width: 2 }
});

slide.addText("GREEN CIRCLE - Can you see this shape?", {
  x: 4,
  y: 2.7,
  w: 1.5,
  h: 0.3,
  fontSize: 14,
  color: "FFFFFF"
});

// Test 3: Simple triangle
slide.addShape("triangle", {
  x: 7,
  y: 1,
  w: 1.5,
  h: 1.5,
  fill: { color: "0000FF" },
  line: { color: "000000", width: 2 }
});

slide.addText("BLUE TRIANGLE - Can you see this shape?", {
  x: 7,
  y: 2.7,
  w: 1.5,
  h: 0.3,
  fontSize: 14,
  color: "FFFFFF"
});

ppt.writeFile({ fileName: "SHAPE-TEST.pptx" })
  .then(() => {
    console.log("✓ Test file created: SHAPE-TEST.pptx");
    console.log("✓ Please open this file and check if you can see:");
    console.log("  - A RED RECTANGLE on the left");
    console.log("  - A GREEN CIRCLE in the middle");
    console.log("  - A BLUE TRIANGLE on the right");
    console.log("");
    console.log("If you CANNOT see these basic shapes, PptxGenJS is not working properly.");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
