var atualizar = function() {

	// Slider
	var tamanho = document.getElementById('tamanhoFlor').value;
	var numPetalas = document.getElementById('numPelatas').value;
	
	// SVG
	var svg = document.getElementById("flower-svg"); 
	var svgDoc = svg.contentDocument;

	// Flor
	var petalas = svgDoc.getElementById("petalas");
	var circuloCentral = svgDoc.getElementById("centro-flor");
	var x = circuloCentral.getAttribute('cx');
	var y = circuloCentral.getAttribute('cy');
	var r = circuloCentral.getAttribute('r');

	// centro: 10% do tamanho
	var interior = tamanho * 0.10;							
	// ângulo entre Mxy e XY
	var arco = Math.floor(360 / numPetalas);
	// abertura do ângulo para C1 e C2				
	var inclinacao = Math.floor(arco / (numPetalas * 2));	

	var angulo_M = 0;
	var M = coordenada(angulo_M, interior);

	// iniciar Path
	var figura = "M " + somar(M['x'], x) + "," + somar(M['y'], y);

	for (var i = 0; i < numPetalas; i++) {
        var angulo_C1 = angulo_M + inclinacao;
        var angulo_C2 = angulo_C1 + arco - (2 * inclinacao);
        var angulo_XY = angulo_M + arco;
        var C1 = coordenada(angulo_C1, tamanho);
        var C2 = coordenada(angulo_C2, tamanho);
        var XY = coordenada(angulo_XY, interior);
        figura += " C " + somar(C1['x'], x) + "," + somar(C1['y'], y) + 
                  " " + somar(C2['x'], x) + "," + somar(C2['y'], y) + 
                  " " + somar(XY['x'], x) + "," + somar(XY['y'], y);
        angulo_M += arco;
 	}

 	// finalizar Path
    figura += " z";

 	// Atualizar SVG
 	circuloCentral.setAttributeNS(null, 'r', interior);
 	petalas.setAttributeNS(null, 'd', figura);

 	console.log("tamanho:" + tamanho);
 	console.log("numPelatas:" + numPetalas);
 	console.log("Path: d = " + figura);
}

var somar = function(a, b) {
	return (parseFloat(a) + parseFloat(b)).toFixed(2);
}

var coordenada = function (angulo, raio) {
 	return {'x' : Math.cos(angulo * (Math.PI / 180)) * raio,
 			'y' : Math.sin(angulo * (Math.PI / 180)) * raio};
}

var informar = function(mensagem) {
	alert(mensagem);
}