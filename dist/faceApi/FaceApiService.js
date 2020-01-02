class FaceApiService {
  async init() {
    await faceDetectionNet.load('../faceApi/weights');
    await faceapi.nets.faceLandmark68Net.load('../faceApi/weights');
    await faceapi.nets.faceRecognitionNet.load('../faceApi/weights');
  }

  getLabeledFacedDescriptor() {
    let stringLabeledFaceDescriptors = window.hp.model;
    stringLabeledFaceDescriptors = stringLabeledFaceDescriptors.map(x => {
      x.descriptors = x.descriptors.map(x => {
        x = new Float32Array(x)
        return x;
      });
      return x;
    });
    let labeledFaceDescriptors = [];
    stringLabeledFaceDescriptors.map(x => {
      labeledFaceDescriptors.push(new faceapi.LabeledFaceDescriptors(x.label, x.descriptors))
    });
    return labeledFaceDescriptors;
  }


  async detectFace(labeledFaceDescriptors, imagePath) {
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    const pendingImage = await faceapi.fetchImage(imagePath);
    const pendingImageRef = await faceapi.detectAllFaces(pendingImage).withFaceLandmarks().withFaceDescriptors();
    const results = pendingImageRef.map(face => faceMatcher.findBestMatch(face.descriptor));
    let knownFaces = results ? results.filter(x => x.label !== "unknown") : [];
    let detectedFaces = knownFaces.length ? knownFaces.map(x => x.label) : [];
    return detectedFaces;
  }

}

window.FaceApiService = FaceApiService;