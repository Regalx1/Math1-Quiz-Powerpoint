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

def draw_triangle(draw, x, y, size, fill_color, outline_color='#000000'):
    """Draw an equilateral triangle pointing up"""
    h = size * math.sqrt(3) / 2
    points = [
        (x, y),
        (x + size, y),
        (x + size/2, y + h)
    ]
    draw.polygon(points, fill=hex_to_rgb(fill_color), outline=hex_to_rgb(outline_color), width=2)

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

    # Answer A - Transformation 1 (hexagon on left, triangle on right)
    draw.rectangle([50, 280, 600, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 290, 100, 330], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((70, 300), "A", fill=(255, 255, 255), font=None)
    draw_hexagon(draw, 250, 350, 30, COLORS['shapeIncorrect'])
    draw_triangle(draw, 340, 330, 45, COLORS['shapeIncorrect'])

    # Answer B - Transformation 2 CORRECT (triangle on top of hexagon)
    draw.rectangle([630, 280, 1180, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 290, 680, 330], fill=hex_to_rgb(COLORS['shapeCorrect']))
    draw.text([650, 300], "B", fill=(255, 255, 255), font=None)
    draw_hexagon(draw, 850, 370, 30, COLORS['shapeCorrect'])
    draw_triangle(draw, 820, 320, 60, COLORS['shapeCorrect'])

    # Answer C - Transformation 3 (triangle below hexagon)
    draw.rectangle([50, 450, 600, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 460, 100, 500], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((70, 470), "C", fill=(255, 255, 255), font=None)
    draw_hexagon(draw, 250, 500, 30, COLORS['shapeIncorrect'])
    draw_triangle(draw, 220, 540, 60, COLORS['shapeIncorrect'])

    # Answer D - Transformation 4 (side by side touching)
    draw.rectangle([630, 450, 1180, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 460, 680, 500], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((650, 470), "D", fill=(255, 255, 255), font=None)
    draw_hexagon(draw, 820, 520, 30, COLORS['shapeIncorrect'])
    draw_triangle(draw, 870, 500, 45, COLORS['shapeIncorrect'])

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

    # Answer A - Transformation 1
    draw.rectangle([50, 280, 600, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 290, 100, 330], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((70, 300), "A", fill=(255, 255, 255), font=None)
    draw_parallelogram(draw, 220, 340, 70, 45, 15, COLORS['shapeIncorrect'])
    draw_square(draw, 310, 340, 45, COLORS['shapeIncorrect'])

    # Answer B - Transformation 2
    draw.rectangle([630, 280, 1180, 430], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 290, 680, 330], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((650, 300), "B", fill=(255, 255, 255), font=None)
    draw_square(draw, 800, 340, 45, COLORS['shapeIncorrect'])
    draw_parallelogram(draw, 860, 340, 70, 45, 15, COLORS['shapeIncorrect'])

    # Answer C - Transformation 3 CORRECT (stacked vertically)
    draw.rectangle([50, 450, 600, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([60, 460, 100, 500], fill=hex_to_rgb(COLORS['shapeCorrect']))
    draw.text((70, 470), "C", fill=(255, 255, 255), font=None)
    draw_parallelogram(draw, 250, 500, 70, 45, 15, COLORS['shapeCorrect'])
    draw_square(draw, 270, 550, 45, COLORS['shapeCorrect'])

    # Answer D - Transformation 4
    draw.rectangle([630, 450, 1180, 600], fill=hex_to_rgb(COLORS['muted']),
                   outline=hex_to_rgb(COLORS['border']), width=2)
    draw.rectangle([640, 460, 680, 500], fill=hex_to_rgb(COLORS['shapeIncorrect']))
    draw.text((650, 470), "D", fill=(255, 255, 255), font=None)
    draw_square(draw, 800, 515, 45, COLORS['shapeIncorrect'])
    draw_parallelogram(draw, 860, 520, 70, 45, -15, COLORS['shapeIncorrect'])

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
