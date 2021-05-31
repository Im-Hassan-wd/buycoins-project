const repoInput = document.forms[0];

repoInput.addEventListener('submit', function(e){
    e.preventDefault();

    const value = repoInput.querySelector('input[type="text"]').value;

    const data = JSON.stringify ({
         query: `{
            user(login: "${value}") {
            name
            login
            bio
            avatarUrl
            repositories(first: 20) {
                nodes {
                url
                name
                updatedAt
                stargazerCount
                forkCount
                primaryLanguage {
                    langName:name
                    color
                }
                    }
                }
            }
        }`
    }
    );

    async function init(){

            
        const response = await fetch(
            'https://api.github.com/graphql',
            {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    Authorization: `Bearer ${API}`
                },
            }
        );
        const json = await response.json();
        const user = json.data;

        const { avatarUrl, name, login, bio, repositories } = user.user;

        repositories.nodes.forEach(({name,updatedAt,forkCount, primaryLanguage, stargazerCount, url})=> {
            if (primaryLanguage === null) {
                return;
            } else {
                const { langName, color } = primaryLanguage;
           
            const clientRepository = document.querySelector('.client-repository')
            clientRepository.innerHTML += `
            <div class="client-repo-list">
                    <header class="client-repo-title">
                        <a href="${url}" target="_blank"><h1>${name}</h1></a>
                        <div>   
                            <button class="far fa-star">Star</button>

                        </div>
                    </header>
                    
                    <div class="repo-list">
                        <div class="lang">
                            <div class="color" style="background:${color}"></div>
                            <p>${langName}</p>
                        </div>
                        <div class="fav">
                            <i class="far fa-star"></i>
                            <p>${stargazerCount}</p>
                        </div>
                        <div class="york">
                            <i class="fas fa-code-branch"></i>
                            <p>${forkCount}</p>
                        </div>
                        <div class="update">
                            <p>${updatedAt.slice(0,10)}</p>
                        </div>
                    </div>
                </div>

            `
             }
        });
        //header navigations
        const headerNav = document.querySelector('.page-header nav')
        const headerTools = document.querySelector('.page-header .tools')
        const mediaNavForm = document.querySelector('.mediaNav form')
        const mediaNavList = document.querySelector('.mediaNav ul')

        headerNav.innerHTML = `
            <ul>
                <li><a href="#">Pull requests</a></li>
                <li><a href="#">Issues</a></li>
                <li><a href="#">Codespaces</a></li>
                <li><a href="#">Marketplace</a></li>
                <li><a href="#">Explore</a></li>
            </ul>
        
        `
        headerTools.innerHTML = `
        <div class="bell">
                <i class="far fa-bell"></i>
              </div>

              <div class="plus">
                <p>+</p>
                <i class="fas fa-caret-down"></i>
              </div>

              <div class="img">
                <img src="/client/img/nbg-weird-head.png">
                <i class="fas fa-caret-down"></i>
              </div>

        `
        mediaNavForm.innerHTML = `
        <span>
            <input class="search" type="text" placeholder="Search or jump to...">

            <i class="far fa-edit"></i>
        </span>
        
        `
        mediaNavList.innerHTML = `
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Pull requests</a></li>
            <li><a href="#">Issues</a></li>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Explore</a></li>
            <li><a href="#">Codespaces</a></li>
            <li><a href="#">Sponsors</a></li>
            <li><a href="#">Settings</a></li>
            <li> <img src="${avatarUrl}">${name}</li>
            <li><i class="fas fa-sign-out-alt">Sign out</i></li>
        
        `

        //  Client page elements
        const clientNav = document.querySelector('.client-page nav');
        const clientForm = document.querySelector('.client-page form')

        clientNav.innerHTML = `
            <ul>
                <li class="fas fa-book-open"><a href="">Overview</a></li>
                <li class="fas fa-book"><a href="">Repositories<span></span></a></li>
                <li class="fas fa-book"><a href="">Projects</a></li>
                <li class="fas fa-dice-d6"><a href="">Packages</a></li>
            </ul>
        
        `
        clientForm.innerHTML = `
            <div>
                <input type="text" placeholder="Find a repository...">
            </div>
            <p>20 results for public repositories</p>
        `
        //respositories
        const repo = document.querySelectorAll('.client-repository .client-repo-list');
        const repoTag = document.querySelector('.client-page ul span')
        const repoResult = document.querySelector('.client-page form p')

        const lengthOfRepo = repo.length;
        repoResult.innerHTML = `<p>${lengthOfRepo} results for public repositories</p>`
        repoTag.textContent = `${lengthOfRepo}`


        // Grabing the elements from the DOM
        const main = document.querySelector('#repository');
        const aside = document.querySelector('aside');
        const userImage = main.querySelector('.tools .img')

        aside.innerHTML = `
            <aside>
            <div class="avatar">
                <img src="${avatarUrl}">
                <i class="far fa-smile"></i>
            </div>

            <div class="text">
                <h1>${name}</h1>
                <p>${login}</p>
                <h2>${bio}</h2>
                
            </div>
            </aside>
        `

        userImage.innerHTML = `
            <img src="${avatarUrl}">
            <i class="fas fa-caret-down"></i>
        `

    };
    init();

})

//menu bar
const burger = document.querySelector('.menu .burger');
const menu = document.querySelector('.mediaNav');

burger.addEventListener('click', ()=>{
    menu.classList.toggle('active')

});


const keyUpInput = document.querySelector('form span');
keyUpInput.addEventListener('keyup', ()=>{
    const value = repoInput.querySelector('input[type="text"]').value;
    if(value === ""){
        location.reload()
    }

})


