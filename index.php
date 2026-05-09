
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge">

<head>
    <!-- Primary Meta Tags -->
    <title>Mapa de actualidad</title>
    <meta name="title" content="Mapa de actualidad">
    <meta name="description" content="titulares.news es una recopilación de titulares en tiempo real de la prensa generalista.">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.titulares.news/">
    <meta property="og:title" content="Mapa de actualidad">
    <meta property="og:description" content="titulares.news es una recopilación de titulares en tiempo real de la prensa generalista.">
    <meta property="og:image" content="https://titulares.news/meta/image/cover.jpg">
    <meta property="og:image:secure_url" content="https://titulares.news/meta/image/cover.jpg" />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="og:image:width" content="256" />
    <meta property="og:image:height" content="256" />
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.titulares.news/">
    <meta property="twitter:title" content="Mapa de actualidad">
    <meta property="twitter:description" content="titulares.news es una recopilación de titulares en tiempo real de la prensa generalista.">
    <meta property="twitter:image" content="https://titulares.news/meta/image/cover_tw.jpg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <meta https-equiv="Content-Type" content="text/html;charset=ISO-8859-1">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    
    <script src="https://hammerjs.github.io/dist/hammer.js"></script>
    
    <script src="assets/main.js"></script>
    <script src="assets/marquee.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6GRGJCH26N"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6GRGJCH26N');
</script>
<style>
    .hide {
        display: none;
    }
    h2 a {
            text-decoration: none;
            color: black;
    }
</style>

<header>
    <div class="desktop-wrapper">
    <div class="data">
        <div class="current-data">
            <div class="data-container">
                <div class="marquee-container">
                    <p> Hoy es 
                        <?php setlocale( LC_ALL,"es_ES@euro","es_ES","esp" );
                        echo utf8_encode(strftime( "%A %d de %B del %Y" )); ?> 
                    </p>
                    <div class="hour"> 
                        <?php echo $timestamp = date('H:i:s'); ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="moreinfo"></div>
        <div class="refresh"></div>
    </div>
</header>
<body>
    <div class="desktop-wrapper">
    <div class="loading">
        <div class="theCount"><div class="theCountn">titulares<span><br>.news</span></div></div>
        <div class="loader">
        </div>
    </div>
    </div>
    <div id="pais" class="hide"></div>
    <div id="diario" class="hide"></div>
    <div id="elmundo" class="hide"></div>
    <div id="elespanol" class="hide"></div>
    <div id="abc" class="hide"></div>
    <div id="minutos" class="hide"></div>
    <div id="vanguardia" class="hide"></div>
    <div id="razon" class="hide"></div>
    <div id="okdiario" class="hide"></div>
    <div id="periodico" class="hide"></div>
    <div id="publico" class="hide"></div>
    <div id="infolibre" class="hide"></div>
    <div id="confidencial" class="hide"></div>

    <div class="about">
        <h1>El mapa de<br> la actualidad</h1>
        <p>titulares.news recopila los titulares de varios medios nacionales en tiempo real. </p><p>De un vistazo, podemos comparar y analizar dónde pone el foco cada medio y desde qué angulo.</p> <p>Los medios se han seleccionado tomando como referencia los datos de audiencias proporcionados por Comscore y OJD Interactiva.</p>
    </div>
    <div class="desktop-wrapper">
    <div  class="general-container">
        <div class="news-wrapper" id="drag">
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="elpais">
                    <div class="sup">
                            <div class="red"></div>
                            <span>El País</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://elpais.com" target="_blank" class="button"></a>
                </div>
            </div>
            
                
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="eldiario">
                        <div class="sup">
                            <div class="red"></div>
                            <span>El diario</span>
                        </div>
                        
                        <h2></h2>
                    </div>
                    <a href="https://eldiario.es" target="_blank" class="button"></a>
                </div>
            </div>
    
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="elmundo">
                    <div class="sup">
                            <div class="red"></div>
                            <span>El Mundo</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://www.elmundo.es/" target="_blank" class="button"></a>
                </div>
            </div>
            
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="elespanol">
                    <div class="sup">
                            <div class="red"></div>
                            <span>El Español</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://elespanol.com" target="_blank" class="button"></a>
                </div>
            </div>
            
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="abc">
                    <div class="sup">
                            <div class="red"></div>
                            <span>ABC</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://www.abc.es/" target="_blank" class="button"></a>
                </div>
            </div>
            
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="minutos">
                    <div class="sup">
                            <div class="red"></div>
                            <span>20 Minutos</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://20minutos.com" target="_blank" class="button"></a>
                </div>
            </div>
            
            <div class="new-container">
                <div class="new-wrapper">
                    <div class="vanguardia">
                    <div class="sup">
                            <div class="red"></div>
                            <span>La Vanguardia</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://lavanguardia.com" target="_blank" class="button"></a>
                </div>
            </div>

            <div class="new-container">
                <div class="new-wrapper">
                    <div class="razon">
                        <div class="sup">
                            <div class="red"></div>
                            <span>La Razón</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://www.larazon.es/" target="_blank" class="button"></a>
                </div>
            </div>

            <div class="new-container">
                <div class="new-wrapper">
                    <div class="okdiario">
                    <div class="sup">
                            <div class="red"></div>
                            <span>OK Diario</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://okdiario.com/" target="_blank" class="button"></a>
                </div>
            </div>

            <div class="new-container">
                <div class="new-wrapper">
                    <div class="periodico">
                    <div class="sup">
                            <div class="red"></div>
                            <span>El Periódico</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://www.elperiodico.com/es/" target="_blank" class="button"></a>
                </div>
            </div>

            <div class="new-container">
                <div class="new-wrapper">
                    <div class="publico">
                    <div class="sup">
                            <div class="red"></div>
                            <span>Público</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://www.publico.es/" target="_blank" class="button"></a>
                </div>
            </div>

            <div class="new-container">
                <div class="new-wrapper">
                    <div class="infolibre">
                    <div class="sup">
                            <div class="red"></div>
                            <span>Infolibre</span>
                        </div>
                        <h2></h2>
                    </div>
                    <a href="https://www.infolibre.es/" target="_blank" class="button"></a>
                </div>
            </div>
            
        </div>
    </div>
    </div>
    
    
</body>
<script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
<script>
  kofiWidgetOverlay.draw('sanzdecastro', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Invita a un café',
    'floating-chat.donateButton.background-color': '#141414',
    'floating-chat.donateButton.text-color': '#fff'
  });
</script>

<script charset='utf-8'>
   

    
    
</script>