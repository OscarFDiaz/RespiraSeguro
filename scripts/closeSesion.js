function closeSesionUser(){

    localStorage.clear();
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('index.html'); 
}