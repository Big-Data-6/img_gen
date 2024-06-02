const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
        console.log('Selected image file path:', URL.createObjectURL(file));
    }
});


        


document.getElementById('runningBtn').addEventListener('click', function() {
    var inputPrompt = document.getElementById('inputPrompt').value;
    var excludePrompt = document.getElementById('excludePrompt').value;
    var numInferenceSteps = document.getElementById('numInferenceSteps').value;
    var numImagesPerPrompt = document.getElementById('numImagesPerPrompt').value;
    var guidanceScale = document.getElementById('guidanceScale').value;
    var seed = document.getElementById('seed').value;
    var batchSize = document.getElementById('batchSize').value;
    var batchCount = document.getElementById('batchCount').value;

    // 이미지 파일 가져오기
    var imageFile = imageInput.files[0];

    // AJAX를 사용하여 서버로 값과 이미지 데이터 전송
    var formData = new FormData();
    formData.append('inputPrompt', inputPrompt);
    formData.append('excludePrompt', excludePrompt);
    formData.append('numInferenceSteps', numInferenceSteps);
    formData.append('numImagesPerPrompt', numImagesPerPrompt);
    formData.append('guidanceScale', guidanceScale);
    formData.append('seed', seed);
    formData.append('batchSize', batchSize);
    formData.append('batchCount', batchCount);
    formData.append('image', imageFile); // 이미지 데이터 추가

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/generate_image', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // 이미지를 표시
            var imgResult = document.createElement('img');
            imgResult.src = URL.createObjectURL(xhr.response);
            document.querySelector('.result').appendChild(imgResult);
        }
    };
    xhr.send(formData);
});



document.querySelector('.save').addEventListener('click', function() {
    var resultImage = document.querySelector('.result img');
    var imageSrc = resultImage.src;
    var a = document.createElement('a');
    a.href = imageSrc;
    a.download = 'generated_image.png'; // 다운로드될 파일 이름
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
