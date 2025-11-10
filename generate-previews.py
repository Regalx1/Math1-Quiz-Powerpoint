from PIL import Image, ImageDraw, ImageFont
import math

# Color palette (matching PowerPoint)
COLORS = {
    'surface': '#1E1E1E',
    'text': '#E0E0E0',
    'primary': '#66B3FF',
    'secondary': '#FF8A5B',
    'muted': '#2A2A2A',
    'correct': '#2ECC71',
    'correctBg': '#1A4D2E',
    'incorrect': '#FF9999',
    'border': '#555555',
    'shapeCorrect': '#66B3FF',
    'shapeIncorrect': '#FF9999'
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def draw_hexagon(draw, x, y, size, fill_color, outline_color='#000000'):
    """Draw a regular hexagon"""
    points = []
    for i in range(6):
        angle = math.pi / 3 * i - math.pi / 6
        px = x + size * math.cos(angle)
        py = y + size * math.sin(angle)
        points.append((px, py))
    draw.polygon(points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=2)

def draw_triangle(draw, x, y, size, fill_color, outline_color='#000000', rotation=0):
    """Draw an equilateral triangle pointing up, with optional rotation in degrees"""
    h = size * math.sqrt(3) / 2
    # Original points (pointing up)
    points = [
        (0, 0),
        (size, 0),
        (size/2, h)
    ]

    # Rotate if needed
    if rotation != 0:
        angle = math.radians(rotation)
        cos_a, sin_a = math.cos(angle), math.sin(angle)
        cx, cy = size/2, h/2  # Center point
        rotated_points = []
        for px, py in points:
            # Translate to origin
            px_centered = px - cx
            py_centered = py - cy
            # Rotate
            new_x = px_centered * cos_a - py_centered * sin_a
            new_y = px_centered * sin_a + py_centered * cos_a
            # Translate back
            rotated_points.append((new_x + cx, new_y + cy))
        points = rotated_points

    # Translate to position
    final_points = [(x + px, y + py) for px, py in points]
    draw.polygon(final_points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=2)

def draw_parallelogram(draw, x, y, width, height, skew, fill_color, outline_color='#000000'):
    """Draw a parallelogram"""
    points = [
        (x + skew, y),
        (x + width + skew, y),
        (x + width, y + height),
        (x, y + height)
    ]
    draw.polygon(points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=2)

def draw_square(draw, x, y, size, fill_color, outline_color='#000000'):
    """Draw a square"""
    draw.rectangle([x, y, x + size, y + size], fill=hex_to_rgb(fill_color),
                   outline=hex_to_rgb(outline_color), width=2)

def draw_diamond(draw, x, y, size, fill_color, outline_color='#000000'):
    """Draw a diamond (rotated square)"""
    points = [
        (x, y),
        (x + size/2, y + size/2),
        (x, y + size),
        (x - size/2, y + size/2)
    ]
    draw.polygon(points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=2)

def create_q6_preview():
    """Q6: Hexagon + Triangle transformations"""
    img = Image.new('RGB', (1280, 720), hex_to_rgb(COLORS['surface']))
    draw = ImageDraw.Draw(img)

    # Title
    draw.text((50, 30), "Q6", fill=hex_to_rgb(COLORS['secondary']), font=None)
    draw.text((150, 30), "How can you make a different shape using the same parts?",
              fill=hex_to_rgb(COLORS['primary']), font=None)

    # Show starting shapes at top
    draw.text((50, 100), "Given shapes:", fill=hex_to_rgb(COLORS['text']), font=None)
    draw_hexagon(draw, 200, 150, 40, COLORS['shapeCorrect'])
    draw.text((170, 210), "Hexagon", fill=hex_to_rgb(COLORS['text']), font=None)

    draw_triangle(draw, 280, 130, 60, COLORS['shapeCorrect'])
    draw.text((285, 210), "Triangle", fill=hex_to_rgb(COLORS['text']), font=None)

    # Answer A - Triangle attached to right edge of hexagon (rotated 90° right)
    draw.rectangle([50, 280, 600, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 290, 100, 330], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((70, 300), "A", fill=(255, 255, 255), font=None)
    # Hexagon centered at 250, 350
    draw_hexagon(draw, 250, 350, 35, COLORS['shapeIncorrect'])
    # Triangle rotated 90° and attached to right edge of hexagon
    # Hexagon right edge is at x=250+35, triangle needs to point right
    draw_triangle(draw, 285, 340, 40, COLORS['shapeIncorrect'], rotation=90)

    # Answer B - Triangle attached to TOP flat edge of hexagon (CORRECT)
    draw.rectangle([630, 280, 1180, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 290, 680, 330], fill=hex_to_rgb(COLORS['shapeCorrect']))
    draw.text((650, 300), "B", fill=(255, 255, 255), font=None)
    # Hexagon centered
    draw_hexagon(draw, 850, 360, 35, COLORS['shapeCorrect'])
    # Triangle pointing up, attached to top edge
    # Top of hexagon is roughly at 360-30, triangle base should align
    draw_triangle(draw, 845, 295, 40, COLORS['shapeCorrect'], rotation=180)

    # Answer C - Triangle attached to bottom-left edge (rotated 240°)
    draw.rectangle([50, 450, 600, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 460, 100, 500], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((70, 470), "C", fill=(255, 255, 255), font=None)
    draw_hexagon(draw, 250, 525, 35, COLORS['shapeIncorrect'])
    # Triangle on lower left edge
    draw_triangle(draw, 215, 545, 40, COLORS['shapeIncorrect'], rotation=240)

    # Answer D - Triangle attached to bottom edge (rotated 180°, pointing down)
    draw.rectangle([630, 450, 1180, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 460, 680, 500], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((650, 470), "D", fill=(255, 255, 255), font=None)
    draw_hexagon(draw, 850, 515, 35, COLORS['shapeIncorrect'])
    # Triangle pointing down, attached to bottom
    draw_triangle(draw, 845, 550, 40, COLORS['shapeIncorrect'], rotation=0)

    img.save('preview-q6.png')
    print("✓ Created preview-q6.png")

def create_q7_preview():
    """Q7: Parallelogram + Square transformations"""
    img = Image.new('RGB', (1280, 720), hex_to_rgb(COLORS['surface']))
    draw = ImageDraw.Draw(img)

    # Title
    draw.text((50, 30), "Q7", fill=hex_to_rgb(COLORS['secondary']), font=None)
    draw.text((150, 30), "How can you make a different shape using the same parts?",
              fill=hex_to_rgb(COLORS['primary']), font=None)

    # Show starting shapes at top
    draw.text((50, 100), "Given shapes:", fill=hex_to_rgb(COLORS['text']), font=None)
    draw_parallelogram(draw, 200, 130, 80, 50, 20, COLORS['shapeCorrect'])
    draw.text((195, 200), "Parallelogram", fill=hex_to_rgb(COLORS['text']), font=None)

    draw_square(draw, 320, 130, 50, COLORS['shapeCorrect'])
    draw.text((325, 200), "Square", fill=hex_to_rgb(COLORS['text']), font=None)

    # Answer A - Square attached to RIGHT slanted edge of parallelogram
    draw.rectangle([50, 280, 600, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 290, 100, 330], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((70, 300), "A", fill=(255, 255, 255), font=None)
    # Parallelogram
    draw_parallelogram(draw, 210, 340, 80, 50, 20, COLORS['shapeIncorrect'])
    # Square attached to right slanted edge
    draw_square(draw, 290, 335, 50, COLORS['shapeIncorrect'])

    # Answer B - Square attached to LEFT side of parallelogram
    draw.rectangle([630, 280, 1180, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 290, 680, 330], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((650, 300), "B", fill=(255, 255, 255), font=None)
    # Parallelogram
    draw_parallelogram(draw, 810, 340, 80, 50, 20, COLORS['shapeIncorrect'])
    # Square attached to left edge
    draw_square(draw, 760, 340, 50, COLORS['shapeIncorrect'])

    # Answer C - Square attached to BOTTOM edge of parallelogram (CORRECT)
    draw.rectangle([50, 450, 600, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 460, 100, 500], fill=hex_to_rgb(COLORS['shapeCorrect']))
    draw.text((70, 470), "C", fill=(255, 255, 255), font=None)
    # Parallelogram on top
    draw_parallelogram(draw, 240, 500, 80, 50, 20, COLORS['shapeCorrect'])
    # Square attached to bottom edge (aligned with parallelogram bottom)
    draw_square(draw, 260, 550, 50, COLORS['shapeCorrect'])

    # Answer D - Square attached to TOP edge of parallelogram
    draw.rectangle([630, 450, 1180, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 460, 680, 500], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((650, 470), "D", fill=(255, 255, 255), font=None)
    # Square on top
    draw_square(draw, 840, 510, 50, COLORS['shapeIncorrect'])
    # Parallelogram attached below
    draw_parallelogram(draw, 840, 560, 80, 50, 20, COLORS['shapeIncorrect'])

    img.save('preview-q7.png')
    print("✓ Created preview-q7.png")

# Generate previews
if __name__ == "__main__":
    print("Generating preview images...")
    create_q6_preview()
    create_q7_preview()
    print("\nPreviews created! Please review:")
    print("- preview-q6.png (Hexagon + Triangle)")
    print("- preview-q7.png (Parallelogram + Square)")
