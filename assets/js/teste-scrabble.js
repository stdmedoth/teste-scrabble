var TesteScrabble = {};

$(document).ready((e)=>{

	TesteScrabble = {
		init: ()=>{
			TesteScrabble.Scrabble = $('#Scrabble');			
			TesteScrabble.ScrabbleFoundWords = $('#DropScrabbleFoundWords');
			TesteScrabble.makeScrable();
			TesteScrabble.handlerFunctions();
		},
		
		Scrabble:{},
		ScrabbleFoundWords: {},

		DownloadWords: [ //palavras rebidas pelo getScrabbleWords()

		],

		FoundWords:[ //palavras já encontradas no scrabble

		], 

		WordsList: [ // palavras usadas no scrabble

		],

		WordIsHide: true,
		getWordtoMake: ()=>{ // retorna palavras contidas no array em getScrabbleWords() sem repetir com WordsList
			let word = "";
			let words = TesteScrabble.DownloadWords;

			while(1){
				var r = Math.floor(Math.random() * words.length - 1) + 1;
				if(TesteScrabble.WordsList.indexOf(words[r]) === -1) {
					word = words[r];
					TesteScrabble.WordsList.push(word);
					break;
				}
			}

			return word;
		},
		
		getRamdomCharAscii: ()=>{ //retorna caracteres ascii de 'a' até 'z'
			let maxAscii = 122;
			let minAscii = 97;

			let ascii = Math.floor(Math.random() * (maxAscii-minAscii+1)) + minAscii;
			return String.fromCharCode(ascii);

		},

		// actions do botão #ScrabbleShowWordsBtn
		showWords: ()=>{
			$('.ScrabbleWords').animate({opacity: 0}, 'fast', function() {
				$(this)
				.css({'background-color': 'red'})
				.animate({opacity: 1});
			});
			$('#ScrabbleShowWordsBtn').val('Esconder Palavras');
			TesteScrabble.WordIsHide = false;
		},
		hideWords: ()=>{
			$('.ScrabbleWords').each((i, e)=>{
				
				if(TesteScrabble.FoundWords.indexOf($(e).data('object')) > -1){
					return ;
				}
				$(e).animate({opacity: 0}, 'fast', function() {
					$(this)
					.css({'background-color': 'white'})
					.animate({opacity: 1});
				});	
				
			})
			$('#ScrabbleShowWordsBtn').val('Mostrar palavras');
			TesteScrabble.WordIsHide = true;
		},


		GameOver(){
			alert('Parabéns! Fim de Jogo');
		},

		getScrabbleWords: ()=>{
			let words = [];
			$.ajax({
				url: '/getWords.php',
				method: 'GET',
				async: false,
				success: function(response){
					words = JSON.parse(response);
				},
				error: function (error){

				}
			});
			TesteScrabble.DownloadWords = words;
			return words;
		},

		clearScrabble: ()=>{
			TesteScrabble.Scrabble.empty();
			TesteScrabble.ScrabbleFoundWords.empty();
			TesteScrabble.FoundWords = [];
			TesteScrabble.WordsList = [];
			TesteScrabble.WordIsHide = true;
			TesteScrabble.getScrabbleWords();
		},

		makeScrable: ()=>{ // função base -> cria o scrabble 
			
			let pos_qnt = $('#ScrabblePosQnt').val();
			TesteScrabble.clearScrabble();
			
			

			for(let i=0; i<pos_qnt; i++){
			
				let word = TesteScrabble.getWordtoMake();		
				if(word.length > pos_qnt){ //caso a palavra não caiba no caça palavras
					i--;
					continue;
				}
				let tableLines = "";

				//adiciona as letras em divs agrupando as palavras por classe
				let drag_mask = "draggable_" + word;
				
				tableLines += "<div class='row'>";
				let max = pos_qnt - word.length;
				let min = 0;
				var isReverse = Math.random() < 0.5;
				let word_text = word;
				if(isReverse){
					word_text = word.split("").reverse().join("");
				}
				let initFrom = Math.floor(Math.random() * (max - (min) + 1 )) + (min);
				for( let i2=0; i2<pos_qnt; i2++ ){


					if(word && word_text[i2-initFrom]){
						tableLines += "<div class='col-md-1 "+drag_mask+" ScrabbleWords' data-object='"+word+"' >" + word_text[i2-initFrom] + "</div>";
					}else{
						tableLines += "<div class='col-md-1'>" + TesteScrabble.getRamdomCharAscii() + "</div>";	
					}				
					
				}

				let jqLines = $(tableLines);
				TesteScrabble.Scrabble.append(jqLines);

				let Words = $('.'+drag_mask);

				let hidden_row = "".padStart(word.length * 2, '_ ');
				hidden_row = hidden_row.slice(0, -1); 
				drop_li = "<li class='drop'>"+hidden_row+"</li>";
				$('#DropScrabbleFoundWords').append($(drop_li));

				Words.draggable({
					revert: "invalid",
					helper: function(event) {
						var helperList = $('<ul class="draggable-helper">');
						if ($(this).is('.'+drag_mask)){
							helperList.append($(this).siblings('.'+drag_mask).addBack().clone());
						} else {
							helperList.append($(this).clone());
						}
						return helperList;
					}
				});	

			}
			$('#DropScrabbleFoundWords').droppable({
				drop: function(event, ui) {
					
					let droppedObject = ui.draggable.data('object'); // get object type
					if(TesteScrabble.FoundWords.indexOf(droppedObject) > -1){
						console.log("Palavra já encontrada");
						console.log(droppedObject);
						return 0;
					}

					let $this = $(this); 
					let found = 0;
					$('#DropScrabbleFoundWords').find('li').each((i, e)=>{
						let atualString = $(e).text().replace(/\ /g, '');
						if(droppedObject.length == atualString.length && atualString.includes('_', 0) ){
							TesteScrabble.FoundWords.push(droppedObject);
							$('.draggable_'+droppedObject).css("background-color", "red");
							
							$(e).empty();
							$(e).append(droppedObject);
							if(TesteScrabble.WordsList.length == TesteScrabble.FoundWords.length){
								TesteScrabble.GameOver();
							}
							return false;
						}
					});
				}
			});	
			
		},
		handlerFunctions: ()=>{
			$('#ScrabbleShowWordsBtn').on('click', (e)=>{
				if(TesteScrabble.WordIsHide){
					TesteScrabble.showWords();
				}else{
					TesteScrabble.hideWords();
				}
			});
			
			$('#ScrabblePosQnt').on('change', (e)=>{
				TesteScrabble.clearScrabble();
				TesteScrabble.makeScrable();	
			});

			$('#ScrabbleReloadBtn').on('click', (e)=>{
				TesteScrabble.clearScrabble();
				TesteScrabble.makeScrable();
			});
			
		}
	};

	TesteScrabble.init();	
});










