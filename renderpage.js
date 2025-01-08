// stolen from the hospital db project (web dev class)
let output = {};

output.myhtml = (msg,gopage,delay,extracode) => {
	delay = delay == undefined ? 3200 : delay;
	extracode = extracode == undefined ? 'console.log(\'no extra code to run\')' : extracode;

	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Processing request</title>

			<link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css">
			<link rel="stylesheet" type="text/css" href="/css/w3.css">
			<link rel="stylesheet" type="text/css" href="/css/styles.css">
			<link rel="stylesheet" type="text/css" href="/css/common.css">


			<style>
				body{
					margin:0;
					padding: 0;
				}
				.loadingguy{
					display: flex;
					min-height: 100vh;
					width: 100%;
					place-content: center;
					place-items: center;
					text-align: center;
					font-family: Arial, Helvetica, sans-serif;
				}
				.loader{
					display:inline-block;
				}

				/* HTML: <div class="loader"></div> */
				.loader{
				width: 40px;
				aspect-ratio: 1;
				--c:no-repeat linear-gradient(#7c7c7c 0 0);
				background: 
					var(--c) 0    0,
					var(--c) 0    100%, 
					var(--c) 50%  0,  
					var(--c) 50%  100%, 
					var(--c) 100% 0, 
					var(--c) 100% 100%;
				background-size: 8px 50%;
				animation: l7-0 1s infinite;
				position: relative;
				overflow: hidden;
				}
				.loader:before {
				content: "";
				position: absolute;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: #ff5e00;
				top: calc(50% - 4px);
				left: -8px;
				animation: inherit;
				animation-name: l7-1;
				}

				@keyframes l7-0 {
				16.67% {background-size:8px 30%, 8px 30%, 8px 50%, 8px 50%, 8px 50%, 8px 50%}
				33.33% {background-size:8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 50%, 8px 50%}
				50%    {background-size:8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 30%}
				66.67% {background-size:8px 50%, 8px 50%, 8px 30%, 8px 30%, 8px 30%, 8px 30%}
				83.33% {background-size:8px 50%, 8px 50%, 8px 50%, 8px 50%, 8px 30%, 8px 30%}
				}

				@keyframes l7-1 {
				20%  {left:0px}
				40%  {left:calc(50%  - 4px)}
				60%  {left:calc(100% - 8px)}
				80%,
				100% {left:100%}
				}
			</style>
		</head>
		<body>
			<div class="loadingguy">
				<div>
					<p>processing</p>
					<div class="loader"></div>
				</div>
			</div>

			<script src="js/sessionstuff.js"></script>
			<script src="js/autodarkmode.js"></script>

			<script>
				setTimeout(() => {
					if('${msg}' != ""){
						alert('${msg}');
					}
					window.location.assign(\`${gopage}\`);
				}, ${delay});

				${extracode}
			</script>
		</body>
		</html>
	`;
}

module.exports = output;