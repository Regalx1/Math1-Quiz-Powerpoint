# ChatGPT Codex - Image Generation Brief
## Math Shapes PowerPoint Quiz Project

**Date**: 2025-11-10
**Your Role**: Image Generation Specialist
**Claude Code's Role**: PowerPoint Assembly & Integration
**Mission**: Generate accurate PNG images for complex shape combinations in a 1st-grade geometry quiz

---

## Overview

You are responsible for generating **precise PNG images** of geometric shape combinations that will be embedded in an interactive PowerPoint quiz. These images replace programmatic shape drawing that cannot achieve the required accuracy.

**Why You**: ChatGPT Codex has image generation capabilities that can produce pixel-perfect geometric shapes with proper alignment, rotation, and composition.

**Why Not Python/Pillow**: Previous attempts with programmatic drawing resulted in misaligned shapes, incorrect rotations, and poor edge-to-edge attachment.

---

## Technical Specifications

### Image Format Requirements

**Mandatory Specifications:**
- **Dimensions**: 400 pixels wide × 300 pixels tall (exactly)
- **Format**: PNG with transparency support
- **Background**:
  - Transparent (preferred) OR
  - Dark background (#1E1E1E) matching PowerPoint slides
- **Resolution**: 72 DPI (standard screen resolution)
- **Color Space**: RGB

### Color Palette (MUST USE)

```
Correct Answer Shapes:   #66B3FF (bright blue)
Incorrect Answer Shapes:  #FF9999 (pink/light red)
Shape Outlines:           #000000 (black, 3px width)
Background (if used):     #1E1E1E (dark gray, almost black)
```

**Critical**: Correct answer images MUST use blue. Incorrect answer images MUST use pink.

### Visual Style Requirements

**Shape Properties:**
- Clean, solid fills (no gradients)
- Bold black outlines (3px)
- Flat 2D style (no shadows, no 3D effects)
- Shapes should be crisp and clear
- High contrast against background

**Positioning:**
- Shapes should be centered in the 400×300 frame
- Leave ~20px padding from edges
- Multiple shapes should be visually balanced

---

## File Naming Convention

**Strict Format:** `q{question-number}-answer-{letter}.png`

**Examples:**
- `q6-answer-a.png` (Question 6, Answer A - incorrect)
- `q6-answer-b.png` (Question 6, Answer B - correct)
- `q7-answer-c.png` (Question 7, Answer C - correct)

**Upload Location:** `previews/` folder in the repository

---

## How Claude Code Uses Your Images

### PowerPoint Embedding Process

When you upload images to `previews/`, Claude Code will:

1. **Pull the latest images** from the repository
2. **Embed them in PowerPoint** using this code:
   ```javascript
   slide.addImage({
     path: "previews/q6-answer-b.png",
     x: 6.2,    // Position in inches
     y: 2.0,
     w: 2.5,    // Width in inches
     h: 1.0     // Height in inches
   });
   ```
3. **Generate the final PowerPoint** with all 31 slides
4. **Commit and push** the result back to the repository

### Layout Context

Your 400×300 images will be displayed:
- Inside dark gray answer boxes (#2A2A2A)
- With an "A", "B", "C", or "D" badge in the corner
- Alongside 3 other answer options (your image + 3 others)
- On a dark background (#1E1E1E)

**This means:**
- Images should work well on dark backgrounds
- Leave some margin space so shapes don't feel cramped
- Ensure shapes are clearly distinguishable from the dark box background

---

## Visual References Available

You have access to these reference files in the repository:

### Original Worksheets
- `Image.jpg` - Original worksheet page
- `Image (1).jpg` - Shape combinations reference
- `Image (2).jpg` - More shape combinations
- `Image (3).jpg` - Cat design (Q2 reference)
- `Image (4).jpg` - Shape attributes
- `Image (5).jpg` - Additional shapes

### Project Specification
- `MATH-SHAPES-QUIZ-CLAUDE-CODE-BRIEF.md` - Full quiz specification with all 15 questions

### Feedback Images (in `issues/` folder)
- `MathPPX-issue16.png` - User feedback on hexagon+triangle positioning
- `MathPPX-issue19.png` - Confirmation that PNG embedding works

**Use these references** to understand what shapes should look like and how they should be positioned.

---

## Questions Requiring Images

### ✅ Q6: Hexagon + Triangle Transformation (Priority 1)

**Question**: "How can you make a different shape using the same parts?"

**Context**: Given a hexagon and a triangle, show 4 different ways they can be combined edge-to-edge.

**Required Images** (4 total):

**`q6-answer-a.png`** (INCORRECT - Pink #FF9999):
- Hexagon (regular, 6 sides)
- Triangle (equilateral) attached to the RIGHT edge of hexagon
- Shapes should touch edge-to-edge (not overlap, not separate)

**`q6-answer-b.png`** (CORRECT - Blue #66B3FF):
- Hexagon (regular, 6 sides)
- Triangle (equilateral) attached to the TOP edge of hexagon
- Triangle should point upward
- This is the CORRECT answer - ensure perfect alignment

**`q6-answer-c.png`** (INCORRECT - Pink #FF9999):
- Hexagon (regular, 6 sides)
- Triangle attached to the BOTTOM-LEFT edge of hexagon
- Triangle rotated to fit that edge

**`q6-answer-d.png`** (INCORRECT - Pink #FF9999):
- Hexagon (regular, 6 sides)
- Triangle attached to the BOTTOM edge of hexagon
- Triangle pointing downward

**Critical**: All shapes must be the SAME SIZE across all 4 images. Only the position/rotation of the triangle changes.

---

### ✅ Q7: Parallelogram + Square Transformation (Priority 1)

**Question**: "How can you make a different shape using the same parts?"

**Context**: Given a parallelogram and a square, show 4 different ways they can be combined edge-to-edge.

**Required Images** (4 total):

**`q7-answer-a.png`** (INCORRECT - Pink #FF9999):
- Parallelogram (slanted rectangle, ~30° skew)
- Square attached to the RIGHT edge of parallelogram

**`q7-answer-b.png`** (INCORRECT - Pink #FF9999):
- Parallelogram
- Square attached to the LEFT edge of parallelogram

**`q7-answer-c.png`** (CORRECT - Blue #66B3FF):
- Parallelogram
- Square attached to the BOTTOM edge of parallelogram (stacked vertically)
- This is the CORRECT answer

**`q7-answer-d.png`** (INCORRECT - Pink #FF9999):
- Square
- Parallelogram attached BELOW the square (square on top, parallelogram below)

**Critical**: Shapes must align edge-to-edge. Same sizes across all 4 images.

---

### ⏳ Q8: Diamond Decomposition (Priority 2)

**Question**: "Can the parts of Shape A be used to make Shape B? (Diamond shape)"

**Required Images** (2 total):

**`q8-shape-a.png`** (Blue #66B3FF):
- A diamond shape (rotated square, 45°)
- Should look like a single solid diamond

**`q8-shape-b.png`** (Blue #66B3FF):
- Two triangles that together form a diamond
- Show the triangles slightly separated (small gap) to indicate decomposition
- The two triangles should clearly be able to form the diamond from Shape A

**Answer**: Yes (Shape A diamond can be decomposed into Shape B triangles)

---

### ⏳ Q9: Shape Attribute Matching (Priority 2)

**Question**: "How do you know the shape is NOT a rectangle? Match with one reason only."

**Required Images** (1 total):

**`q9-shape.png`** (Blue #66B3FF):
- A pentagon (5-sided polygon)
- Should be clearly NOT a rectangle
- Regular pentagon shape

**Context**: This is paired with text options:
- A. Shape is not closed
- B. Shape has more than 4 sides
- C. Shape is not 2-dimensional
- D. Shape has fewer than 4 sides (Correct: should be "different vertices" but marked as D)

---

### ⏳ Q10: Rectangle from L-Shape (Priority 2)

**Question**: "How can you use the parts of this shape to make a rectangle? (L-shaped figure)"

**Required Images** (5 total):

**`q10-l-shape.png`** (Blue #66B3FF):
- An L-shaped figure made of two rectangles
- Clear L configuration

**`q10-answer-a.png`** (INCORRECT - Pink #FF9999):
- Configuration showing rectangles arranged but NOT forming a rectangle

**`q10-answer-b.png`** (INCORRECT - Pink #FF9999):
- Different non-rectangular arrangement

**`q10-answer-c.png`** (CORRECT - Blue #66B3FF):
- The two pieces arranged to form a perfect rectangle
- This is the CORRECT configuration

**`q10-answer-d.png`** (INCORRECT - Pink #FF9999):
- Another non-rectangular arrangement

---

### ⏳ Q11: Cylinder + Cone Stacking (Priority 3)

**Question**: "Put all the shapes together. Circle the shape they can make. (Cylinder + Cone)"

**Required Images** (5 total):

**`q11-given-cylinder.png`** (Blue #66B3FF):
- A 3D cylinder (isometric view)
- Use layered 2D shapes to create 3D effect (top ellipse, rectangle body, bottom ellipse)

**`q11-given-cone.png`** (Blue #66B3FF):
- A 3D cone (isometric view)
- Triangle with curved base

**`q11-answer-a.png`** (CORRECT - Blue #66B3FF):
- Cylinder + Cone stacked vertically (cone on top)
- Should look like an ice cream cone or a tower

**`q11-answer-b.png`** (INCORRECT - Pink #FF9999):
- Different arrangement (side by side, or cone on bottom, etc.)

**`q11-answer-c.png`** (INCORRECT - Pink #FF9999):
- Another incorrect arrangement

**`q11-answer-d.png`** (INCORRECT - Pink #FF9999):
- Another incorrect arrangement

---

### ⏳ Q12: Cone to Pyramid (Priority 3)

**Question**: "How can you change this shape from a cone to a pyramid?"

**Answer**: B (Add edges/flatten)

**Required Images** (2 total):

**`q12-cone.png`** (Blue #66B3FF):
- A 3D cone (smooth curved sides)

**`q12-pyramid.png`** (Blue #66B3FF):
- A 3D pyramid (straight edges, triangular faces)
- Should clearly show the difference from the cone

---

### ⏳ Q13: T-Shaped Blocks (Priority 3)

**Question**: "How many cubes are used to build this shape?"

**Required Images** (1 total):

**`q13-t-shape.png`** (Blue #66B3FF):
- A T-shaped arrangement of cubes
- Should clearly show individual cubes making up the T shape
- Isometric 3D view

**Answer**: B (Specific count - refer to original worksheet)

---

### ⏳ Q14: Real-World 3D Shapes (Priority 3)

**Question**: "Circle all the objects shown that are 3-dimensional."

**Required Images** (4 total):

These should show simple representations of:

**`q14-object-a.png`** - A 2D shape (circle, triangle, or square)
**`q14-object-b.png`** - A 3D shape (sphere, cube, or cylinder) - CORRECT
**`q14-object-c.png`** - Another 2D shape
**`q14-object-d.png`** - Another 3D shape - CORRECT

Or refer to the original worksheet for specific objects.

---

### ⏳ Q15: Animal Composition (Priority 3)

**Question**: "Which shape can you use these 3 shapes to make?"

**Required Images** (5 total):

**`q15-given-shapes.png`** (Blue #66B3FF):
- Show 3 basic shapes (triangle, rectangle, semicircle)

**`q15-answer-a.png`** (INCORRECT - Pink #FF9999):
- An animal/object composition that doesn't use the 3 shapes correctly

**`q15-answer-b.png`** (INCORRECT - Pink #FF9999):
- Another incorrect composition

**`q15-answer-c.png`** (CORRECT - Blue #66B3FF):
- The CORRECT animal composition using all 3 given shapes

**`q15-answer-d.png`** (INCORRECT - Pink #FF9999):
- Another incorrect composition

---

## Quality Checklist

Before uploading each image, verify:

### ✅ Technical Requirements
- [ ] Dimensions: Exactly 400×300 pixels
- [ ] Format: PNG with transparency
- [ ] File size: Under 100KB (for efficiency)
- [ ] Correct color: Blue (#66B3FF) for correct, Pink (#FF9999) for incorrect
- [ ] Black outlines: 3px width

### ✅ Visual Quality
- [ ] Shapes are centered and balanced
- [ ] Adequate padding from edges (~20px)
- [ ] Shapes touch edge-to-edge (where required)
- [ ] No overlapping shapes (unless intentional)
- [ ] Consistent sizing across related images (e.g., all Q6 answers use same-size hexagon)

### ✅ File Management
- [ ] Correct filename format: `q{num}-answer-{letter}.png`
- [ ] Uploaded to `previews/` folder
- [ ] Lowercase letters only
- [ ] No spaces in filename

---

## Workflow

### Recommended Process

**1. Generate Test Images First (Q6 & Q7)**
- Start with Q6-Q7 since these are already attempted
- Upload to `previews/` folder
- Claude Code will test them in PowerPoint
- User will provide feedback via GitHub Issues

**2. Iterate Based on Feedback**
- Adjust positioning/alignment based on user screenshots
- Regenerate and re-upload
- Repeat until approved

**3. Batch Generate Remaining Questions**
- Once Q6-Q7 are approved, generate Q8-Q15
- Upload all images at once
- Claude Code will integrate them into PowerPoint

**4. Final Review**
- User tests complete PowerPoint
- Make any final adjustments
- Project complete!

---

## Communication Protocol

### When You Upload Images

Add a note indicating:
- Which questions you completed (e.g., "Uploaded Q6 all answers + Q7 all answers")
- Any questions or concerns about specific shapes
- Whether you followed the references or made adjustments

### If You Have Questions

Ask about:
- Ambiguous shape descriptions
- Preferred style variations
- Priority order (which questions first)
- Any technical issues

### What to Expect from Claude Code

Claude Code will:
- Pull your images automatically when updated
- Regenerate the PowerPoint within minutes
- Commit the result to the repository
- Report any issues (missing files, wrong dimensions, etc.)

---

## Example: Perfect Q6 Answer B

Here's what an ideal image looks like:

```
q6-answer-b.png (400×300px)

┌────────────────────────────────────────┐
│         (20px padding)                 │
│                                        │
│              ╱▲╲                       │  Triangle (blue)
│             ╱  ╲                       │  pointing up
│            ╱    ╲                      │
│           ╱______╲                     │
│          ╱        ╲                    │
│         ╱  Hexagon ╲                   │  Hexagon (blue)
│        │    (Blue   │                  │  6 sides
│        │   #66B3FF) │                  │  regular
│         ╲          ╱                    │
│          ╲________╱                     │
│                                        │
│         (20px padding)                 │
└────────────────────────────────────────┘

Key features:
- Triangle's base edge aligns perfectly with hexagon's top edge
- Both shapes are blue (#66B3FF) - this is correct answer
- Centered in 400×300 frame
- Black 3px outlines on both shapes
- Transparent or dark background
```

---

## Success Criteria

Your images are successful when:
- ✅ User confirms shapes display correctly in PowerPoint
- ✅ Shapes are visually accurate to worksheet references
- ✅ All 15 questions have required images
- ✅ Correct/incorrect color coding is consistent
- ✅ Claude Code successfully embeds all images without errors

---

## Questions?

If anything is unclear:
1. Check the original worksheet images (`Image.jpg`, `Image (1-5).jpg`)
2. Review `MATH-SHAPES-QUIZ-CLAUDE-CODE-BRIEF.md` for question context
3. Ask the user directly via GitHub Issues
4. Start with Q6-Q7 and get feedback before proceeding to Q8-Q15

---

**Ready to begin?** Start with Q6 and Q7 (Priority 1), upload to `previews/`, and we'll test immediately!
