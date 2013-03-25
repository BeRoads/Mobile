/*
 * Simple translate function with hardcoded translations
 */

function _tr(str, language){
	var lang = {
		"translations" :
		 {
		 
		 	"en" : { 
					about : "About",
					overview : "Overview",
					credits : "Credits",
					map : "Map",
					map_options : "Map options",
					settings : "Settings",
					back : "Back",
					language : "Language",
					area : "Area",
					options : "Options",
					save : "Save",
					traffic : "Traffic",
					radars : "Radars",
					webcams : "Webcams",
					displayTraffic : "Display traffic", 
					displayRadars : "Display radars",
					displayWebcams : "Display webcams",
					settings_message : "Please enter the information above",
					preferences : "Preferences",
					sorry : "Sorry",
					loading : "Loading",
					thanks : "Thanks to"
			},
			
			"fr" : {
				about : "A propos",
				overview : "Aperçu",
				credits : "Crédits",
				map : "Carte",
				map_options : "Options carte",
				settings : "Réglages",
				back : "Retour",
				language : "Langage",
				area : "Zone",
				options : "Options",
				save : "Sauver",
				traffic : "Traffic",
				radars : "Radars",
				webcams : "Webcams",				
				displayTraffic : "Afficher traffic", 
				displayRadars : "Afficher radars",
				displayWebcams : "Afficher cameras",
				settings_message : "Veuillez compléter les informations ci-dessus",
				preferences : "Préférences",
				sorry : "Désolé",
				loading : "Loading",
				thanks : "Merci à"
			},
			
			"nl" : {
				about : "Over",
				overview : "Overzicht",
				credits : "Credits",
				map : "Kaart",
				map_options : "Kaart opties",
				settings : "Instellingen",
				back : "Terug",
				language : "Taal",
				area : "Gebied",
				options : "Opties",
				save : "Besparen",
				traffic : "Verkeer",
				radars : "Radars",
				webcams : "Webcams",
				displayTraffic : "Weer verkeer", 
				displayRadars : "Weer radars",
				displayWebcams : "Weer camera's",
				settings_message : "Vul de bovenstaande informatie",
				preferences : "Voorkeuren",
				sorry : "Sorry",
				loading : "Loading",
				thanks : "Thanks to"
			},
			
			"de" : {
				about : "Over",
				overview : "Overzicht",
				credits : "Credits",
				map : "Kaart",
				map_options : "Karte Optionen",
				settings : "Instellingen",
				back : "Terug",
				language : "Taal",
				area : "Gebied",
				options : "Opties",
				save : "Besparen",
				traffic : "Verkeer",
				radars : "Radars",
				webcams : "Webcams",
				displayTraffic : "Anzeige verkehr", 
				displayRadars : "Anzeige radars",
				displayWebcams : "Anzeige kameras",
				settings_message : "Bitte geben Sie die oben genannten Informationen",
				preferences : "Vorlieben",
				sorry : "Sorry",
				loading : "Loading",
				thanks : "Thanks to"
			}
		
				
		
		}
	
	};	

	
	return lang.translations[language][str] || lang.translations.en.overview	 || "{translation key not found}";
}
