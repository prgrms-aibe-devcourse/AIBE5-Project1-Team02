from PIL import Image
import os

def split_image_equal(image_path, output_dir):
    img = Image.open(image_path)
    width, height = img.size
    
    num_splits = 5
    # Calculate each segment width
    segment_width = width / num_splits
    
    # We want square crops of size height x height, centered in each segment
    crop_size = height
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for i in range(num_splits):
        # Center of the segment
        center_x = (i + 0.5) * segment_width
        
        # Crop coordinates
        left = center_x - (crop_size / 2)
        top = 0
        right = center_x + (crop_size / 2)
        bottom = height
        
        # Ensure it stays within bounds (handles floating point)
        left = max(0, int(left))
        right = min(width, int(right))
        
        crop_img = img.crop((left, top, right, bottom))
        
        # Resize to square if necessary (should already be close to height x height)
        # crop_img = crop_img.resize((height, height), Image.Resampling.LANCZOS)
        
        output_filename = f"passport_badge_{i+1}.png"
        crop_img.save(os.path.join(output_dir, output_filename))
        print(f"Saved {output_filename}")

if __name__ == "__main__":
    image_path = "assets/badges/무제.png"
    output_dir = "assets/badges"
    split_image_equal(image_path, output_dir)
