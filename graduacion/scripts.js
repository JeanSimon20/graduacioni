window.onload = function() {
    var canvas = document.getElementById('confetti-canvas');
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var confettiCount = 300;
    var confetti = [];
    var animationFrameId;
    var startTime = Date.now();
    var duration = 5000;


    
    function ConfettiParticle() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.radius = Math.random() * 6 + 1;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        this.speed = Math.random() * 5 + 2;
        this.alpha = 1;
    }

    ConfettiParticle.prototype.update = function() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = -10;
            this.x = Math.random() * width;
            this.speed = Math.random() * 5 + 2;
        }
    }

    ConfettiParticle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }

    function animate() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            ctx.clearRect(0, 0, width, height);
            for (var i = 0; i < confettiCount; i++) {
                confetti[i].update();
                confetti[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        } else {
            fadeOutConfetti();
        }
    }

    function fadeOutConfetti() {
        var fadeDuration = 2000;
        var fadeStartTime = Date.now();

        function fade() {
            var currentTime = Date.now();
            var elapsedTime = currentTime - fadeStartTime;
            var alpha = 1 - (elapsedTime / fadeDuration);
            ctx.clearRect(0, 0, width, height);

            if (alpha > 0) {
                for (var i = 0; i < confettiCount; i++) {
                    confetti[i].alpha = alpha;
                    confetti[i].update();
                    confetti[i].draw();
                }
                requestAnimationFrame(fade);
            } else {
                ctx.clearRect(0, 0, width, height);
            }
        }

        fade();
    }

    for (var i = 0; i < confettiCount; i++) {
        confetti.push(new ConfettiParticle());
    }
    function startConfetti() {
        // Redireccionar a flor.html al presionar el botón
        window.location.href = '/c++/flor.html';
    }

    animate();
};
