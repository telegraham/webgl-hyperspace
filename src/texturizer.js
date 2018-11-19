export default (emojiCanvasSet) => 
  Object.values(emojiCanvasSet).map((emojiCanvas) => 
    new THREE.CanvasTexture(emojiCanvas))