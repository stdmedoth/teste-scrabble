<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Teste Scrabble</title>
	<link rel="stylesheet" href="/assets/jqueryui/jquery-ui.min.css">
	<link rel="stylesheet" href="/assets/css/bootstrap/bootstrap.css">
	<link rel="stylesheet" href="/assets/css/teste-scrabble.css">

</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Teste Scrabble</h4>
					</div>	
					<div class="card-body">
						<div class="container">
							<div class="row">
								<div class="col-md-3">
									<div class="row">
										<div class="col">
											<label>Quantidade  de Posições</label>
											<input id="ScrabblePosQnt" min="6" max="12" type="number" class="form-control" value="11">	
										</div>
									</div>
									<div class="row">
										<div class="col">
											<label>Palavras Encontradas:</label>
											<table id="ScrabbleFoundWords">
													<div class="card">
														<div class="card-body ">
															<ul id="DropScrabbleFoundWords">
	 
															</ul>
														</div>	
													</div>
											</table>
										</div>
									</div>
								</div>
								<div class="col-md-9">
									<div class="row">
										<div class="col">
											<div class="card">
												<div class="card-body">
													<div id="ScrabbleContainer" class="container">
														<div id="Scrabble">
															
														</div>
													</div>
													<div class="card-footer">
														<input 
															class="btn btn-primary" 
															type="button" 
															id="ScrabbleShowWordsBtn" 
															value="Mostrar palavras">	

														<input 
															class="btn btn-primary" 
															type="button" 
															id="ScrabbleReloadBtn" 
															value="Reiniciar">	
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>	
				</div>	
			</div>	
		</div>
	</div>

	<script type="text/javascript" src="/assets/js/jquery-3.6.0.min.js"></script>

	<script type="text/javascript" src="/assets/jqueryui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/assets/js/multidraggable.js"></script>
	<script type="text/javascript" src="/assets/js/bootstrap/bootstrap.js"></script>
	<script type="text/javascript" src="/assets/js/teste-scrabble.js"></script>
	
</body>
</html>