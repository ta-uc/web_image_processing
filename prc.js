function pr(src,dest){
  if (cgid % 3 === 0) {
    const mtr = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
    for (let j = 0; j < width; j++) {
      for (let i = 0; i < height; i++) {
        let index = (j + i * width) * 4;
        let th = mtr[(j % 4) + (i % 4)*4];

        let r = src.data[index + 0]/16;
        let g = src.data[index + 1]/16;
        let b = src.data[index + 2]/16;
        dest.data[index + 3] = 255;

        let v = r * 0.298912 + g * 0.586611 + b * 0.114478;

        if(v < th){
          dest.data[index + 0] = 0;
          dest.data[index + 1] = 0;
          dest.data[index + 2] = 0;
        }else{
          dest.data[index + 0] = 255;
          dest.data[index + 1] = 255;
          dest.data[index + 2] = 255;
        }
      }
    }
  }else if (cgid % 3 === 1) {
    for (var i = 0; i < dest.data.length; i += 4) {
      dest.data[i + 0] = 255 - src.data[i + 0]; // Red
      dest.data[i + 1] = 255 - src.data[i + 1]; // Green
      dest.data[i + 2] = 255 - src.data[i + 2]; // Blue
      dest.data[i + 3] = 255;                   // Alpha
    }
  }else{
    for (var i = 0; i < dest.data.length; i += 4) {
      src.data[i] > 127 ? dest.data[i] = 255 : dest.data[i] = 0;
      src.data[i] > 127 ? dest.data[i + 1] = 255 : dest.data[i + 1] = 0;
      src.data[i] > 127 ? dest.data[i + 2] = 255 : dest.data[i + 2] = 0;
      dest.data[i+3] = 255;
    }
  }
}
