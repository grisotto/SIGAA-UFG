/**
		 * Aqui separa a string encontrada neste formato
		 */		
var REGEX_HORARIO = /([1-7]+)([MTN])([0-9]+)/;
		
var	TABELA_DIAS = [null, "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
//load
window.addEventListener('DOMContentLoaded', run, false);


	function run (event) {
			var doc = event.originalTarget;
			//var doc = content.document;
			
			
				
			

						
			// Inicia o processo de substituição dos horários na tabela de turmas:
			
				//Procura as possíveis tabelas que contém coluna de horário:
				var table = document.getElementById("lista-turmas");
				table = (table == null) ? document.getElementById("lista-turmas-curriculo") : table;
				table = (table == null) ? document.getElementById("lista-turmas-extra") : table;
				
				if (table == null) {
					//Verifica se possui a tabela de turmas selecionadas (matrícula concluída):
					var tableMatriculaConcluida = document.getElementsByClassName("listagem");
					if (tableMatriculaConcluida.length && 
							tableMatriculaConcluida[0].caption.innerHTML.toLowerCase().indexOf("turmas") != -1) {
						table = tableMatriculaConcluida[0];
					} else {
						//alert("Esta página não parece conter horários");
						 $('[style^=margin-top]').attr('id', 'lista-turmas');
						table = document.getElementById("lista-turmas");
						
						
						
						if(table == null){
						
						return;
						}
					}
				}
				
				//Se achou uma tabela que possui possivelmente uma coluna de horários, efetua a busca pela coluna:
				var tableHead = table.getElementsByTagName("thead")[0];
				var headCols = tableHead.getElementsByTagName("td");
				if (headCols == null || headCols.length == 0) {
					headCols = tableHead.getElementsByTagName("th");
				}
				
				var existeTDHorario = false;
				// Procura índice da coluna da tabela que contém os horários
				var spanTDHorario = 0;
				const REGEX_HORARIO = /hor[aá]rio/i; //O modificador 'i' ao final indica case-insensitive matching
				for (var i = 0; i < headCols.length; i++) {
					var td = headCols[i];
					spanTDHorario += td.colSpan;
					if (td.innerHTML && REGEX_HORARIO.test(td.innerHTML)) {
						existeTDHorario = true;
						break;
					}
				}
				//Verifica se encontrou a coluna <td> de Horário:
				if (!existeTDHorario) {
					return;
				}

				if (!this.addStylesheet(document)) {
					// Se já adicionou o stylesheet, os horários já estão formatados
					return;
				}
				
				var tableBodies = table.tBodies;
				for (var j = 0; j < tableBodies.length; j++) {
					var tableBody = tableBodies[j];
					var tableRows = tableBody.rows;
					
					for (var i = 0; i < tableRows.length; i++) {
						var row = tableRows[i];
						var cols = row.getElementsByTagName("td");
						//Procura pela coluna referente à coluna Horário encontrada no cabeçalho
						//Esta busca é necessária devido ao uso de atributos colspan > 1 em <TD> 
						var indiceAtualTDHorario = 0;
						var qtdAtualSpanAtualTDHorario = 0;
						for (var k = 0; k < cols.length; k++) {
							qtdAtualSpanAtualTDHorario += cols[k].colSpan;
							if (qtdAtualSpanAtualTDHorario == spanTDHorario) {
								indiceAtualTDHorario = k;
								break;
							}
						}
						
		                var tdHorario = cols[indiceAtualTDHorario];
						this.formatarHorarios(tdHorario);
					}
				}

		}

		/**
		 * Formata horários separados por espaço. Exemplo: com a entrada "3T46 5T4" a 
		 * saída será "3T46 5T4 <br/> Ter <br/> 14:00 - 16:00 <br/> Qui <br/> 14:00 - 15:00"
		 */

 function formatarHorarios(tdHorario) {
        	var horarios = tdHorario.innerHTML;
	        if (!horarios || horarios.length == 0 || !this.REGEX_HORARIO.test(horarios)) {
	            return;
	        }
	        var horariosFormatado = "";
	        tdHorario.style.textAlign = "center";
	
	        var arrayHorarios = horarios.split(" "); //Transforma a string em array de strings
	        for (var i = 0; i < arrayHorarios.length; i++) {
	            var h = arrayHorarios[i].replace(/^[ ]$/g, ""); //Remove os espaços
	            if (h.length && this.REGEX_HORARIO.test(h)) {
		            var partes = this.REGEX_HORARIO.exec(h);
		            var dias = this.formatarDias(partes[1]);
		            var turno = partes[2];
		            var horas = this.formatarHoras(partes[3], turno);
		            
		            dias = "<span class='sigaa_facil_dias'>" + dias + "</span>"; 
		            horas = "<span class='sigaa_facil_horas'>" + horas + "</span>";
		            horariosFormatado += dias + "<br/>" + horas + "<br/>";
	            }
	        }
	        tdHorario.innerHTML = horariosFormatado + "<div class='sigaa_facil_separador'></div>" + tdHorario.innerHTML;
		}



/**
		 * Formata as horas do horário. Exemplo: Se o horário é 35M24, a entrada 
		 * da função é formatarHora("24", "M") e a saída será "8:00 - 10:00".
		 */
	function	formatarHoras(stringIndicesHoras, turno) {
			//Os índices de hora são números no intervalo [0,...,9]	
			// aqui le o primeiro numero. exemplo: 4M123.  vai ler o 1
			var indiceHoraInicial = parseInt(stringIndicesHoras.charAt(0));
			var indiceHoraFinal;
			var horaAula = 50;
			var tempoTotalAula;
			var tempoHora;
			var tempoMin;
			var horaInicial;
			var horaFinal;
			
			if (stringIndicesHoras.length == 1) {
				indiceHoraFinal = indiceHoraInicial;
			} else {
				//Aqui caso tenha mais de 1 numero-SEMPRE TEM QUE TER. ultimo numero. Exemplo 5M123, vai ler o 3
				indiceHoraFinal = parseInt(stringIndicesHoras.charAt(stringIndicesHoras.length - 1));
			}

			tempoTotalAula = (Math.abs(indiceHoraFinal - indiceHoraInicial) + 1 ) * horaAula;
		
						
						
			var inicial = 1;
				
				

			if (turno == 'M') {
				//1 horario 07:30 = 450 min
				horaInicial = 450;
				
				while (inicial != indiceHoraInicial) {
			        horaInicial = horaInicial + horaAula;
			        

			        inicial++;
			    }
				
			        if(indiceHoraInicial < 3 && indiceHoraFinal > 3 )
			       {
					tempoTotalAula = tempoTotalAula + 20;
			        	
			        	
			       }
				if(indiceHoraInicial >= 3)
				{
				   horaInicial = horaInicial + 20;
				}

				var auxe = horaInicial;
				tempoMin = auxe % 60;
				if(tempoMin == 0) tempoMin = "00"
				tempoHora = Math.floor(auxe / 60);
				
				tempoTotalAula = tempoTotalAula + horaInicial;

				horaInicial = tempoHora + ":" + tempoMin;
				
				
				
				

			
				
				tempoMin = (tempoTotalAula) % 60;
				if(tempoMin == 0) tempoMin = "00"
				tempoHora = Math.floor(tempoTotalAula / 60);
				
				horaFinal = tempoHora + ":" + tempoMin;
				

				
			} else if (turno == 'T') {
				
				//1 horario 13:30
				horaInicial = 810;
				
				while (inicial != indiceHoraInicial) {
			        horaInicial = horaInicial + horaAula;

			        inicial++;
			    }
				
				  if(indiceHoraInicial < 3 && indiceHoraFinal > 3 )
			       {
					tempoTotalAula = tempoTotalAula + 20;
			        	
			        	
			       }
				if(indiceHoraInicial >= 3)
				{
				   horaInicial = horaInicial + 20;
				}

				var auxe = horaInicial;
				tempoMin = auxe % 60;
				if(tempoMin == 0) tempoMin = "00"
				tempoHora = Math.floor(auxe / 60);
				
				tempoTotalAula = tempoTotalAula + horaInicial;
				horaInicial = tempoHora + ":" + tempoMin;
				
				
				
				

				
				
				tempoMin = (tempoTotalAula) % 60;
				if(tempoMin == 0) tempoMin = "00"
				tempoHora = Math.floor(tempoTotalAula / 60);
				
				horaFinal = tempoHora + ":" + tempoMin;
				
			} else if (turno == 'N'){
				
				
				 //1 horario 19:00
				horaInicial = 1140;
				
				while (inicial != indiceHoraInicial) {
			        horaInicial = horaInicial + horaAula;

			        inicial++;
			    }
			       if(indiceHoraInicial < 3 && indiceHoraFinal > 3 )
			       {
					tempoTotalAula = tempoTotalAula + 20;
			        	
			        	
			       }
				if(indiceHoraInicial >= 3)
				{
				   horaInicial = horaInicial + 20;
				}

				
				
				var auxe = horaInicial;
				tempoMin = auxe % 60;
				if(tempoMin == 0) tempoMin = "00"
				tempoHora = Math.floor(auxe / 60);
				
				tempoTotalAula = tempoTotalAula + horaInicial;
				horaInicial = tempoHora + ":" + tempoMin;
				
				
				
				

				
				
				tempoMin = (tempoTotalAula) % 60;
				if(tempoMin == 0) tempoMin = "00"
				tempoHora = Math.floor(tempoTotalAula / 60);
				
				horaFinal = tempoHora + ":" + tempoMin;
							
			}
			
	


			return horaInicial + " - " + horaFinal;
		}
	/**
		 * Formata os dias do horário. Exemplo: Se o horário é 35M24, a entrada 
		 * da função é formatarHora("35") e a saída será "3ª 5ª".
		 */
function formatarDias(stringDias) {
			var dias = stringDias.split("");
			var diasFormatado = "";
			for (var i = 0; i < dias.length; i++) {
				if (i > 0) {
					diasFormatado += " ";
				}
				diasFormatado += this.TABELA_DIAS[parseInt(dias[i])];
			}
			return diasFormatado;
		}

		/**
		 * Adiciona o arquivo de estilos utilizado pelo SIGAA Fácil na página
		 */
	function addStylesheet(document) {
			var head = document.getElementsByTagName("head")[0],
			style = document.getElementById("sigaafacil_style");
		
			if (!style) {
				style = document.createElement("link");
				style.id = "sigaafacil_style";
				style.type = "text/css";
				style.rel = "stylesheet";
				style.href = chrome.extension.getURL('skin.css');
				//style.href = "chrome://sigaafacil/skin/skin.css";
				head.appendChild(style);
				return true;
			} else {
				return false;
			}
		}




