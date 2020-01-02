const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
// export const faceDetectionNet = tinyFaceDetector
// export const faceDetectionNet = faceapi.nets.mtcnn; //mtcnn

// SsdMobilenetv1Options
const minConfidence = 0.6;

// TinyFaceDetectorOptions
// const inputSize = 408;
// const scoreThreshold = 0.5;
//
// // MtcnnOptions
// const minFaceSize = 50;
// const scaleFactor = 0.8;
//
// function getFaceDetectorOptions(net: faceapi.NeuralNetwork<any>) {
//   return net === faceapi.nets.ssdMobilenetv1
//     ? new faceapi.SsdMobilenetv1Options({minConfidence})
//     : (net === faceapi.nets.tinyFaceDetector
//         ? new faceapi.TinyFaceDetectorOptions({inputSize, scoreThreshold})
//         : new faceapi.MtcnnOptions({minFaceSize, scaleFactor})
//     )
// }

window.faceDetectionOptions =  new faceapi.SsdMobilenetv1Options({minConfidence}) // getFaceDetectorOptions(faceDetectionNet);
