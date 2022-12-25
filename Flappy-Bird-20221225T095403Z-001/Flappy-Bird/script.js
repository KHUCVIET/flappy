let move_speed = 5, grativy = 0.2;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let td = 1;
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

let bird_props = bird.getBoundingClientRect();

let background_bg = document.querySelector('.background');

let background = background_bg.getBoundingClientRect();

let arrBG = ['images/background-img.png','images/1.jpg','images/2.jpg','images/3.jpg'];
let ks = false;
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');
let inmg = 1;

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
  
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
				element.style.left = pipe_sprite_props.left - move_speed + 'px';
              
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width 
                    && bird_props.left + bird_props.width > pipe_sprite_props.left 
                    && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height 
                    && bird_props.top + bird_props.height > pipe_sprite_props.top 
                    || bird_props.top <= 0 || bird_props.bottom >= background.bottom
                    ){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
					inmg = 0;
                    td = 1;
                    move_speed = 5; grativy = 0.2;
                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
						
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                        
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
	
					
					
                }
             }
        });
        requestAnimationFrame(move);
		if(score_val.innerHTML%50==0 && score_val.innerHTML>0){
			 if(!ks){
				 move_speed = (score_val.innerHTML/5);
				 background_bg.style.backgroundImage ="url("+arrBG[inmg]+")" ;
				 console.log(arrBG[inmg])
				 if(inmg == 3){
					 inmg =0;
				 }
				 inmg++;
                 td+=2;
                 grativy+=0.1;
				 ks = true;
			 }
		}else{
			 ks =false;
		}
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird-2.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird.png';
            }
        });

       
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 115){
            pipe_gap = Math.floor(Math.random() * 20)+25;
            pipe_seperation = Math.floor(Math.random() * 3);

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = (100 + Math.floor(Math.random() * 15))+'vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top =Math.floor(Math.random() * 20)+ pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = (100 + Math.floor(Math.random() * 20))+'vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation+=td;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
