// variables
const iconMenu = document.getElementById('iconMenu');
const iconMenuCose = document.getElementById('iconMenu-close');
const navMenu = document.getElementById('navMenu');
const hiddenMenu = document.getElementById('hidden-menu');
const inputName = document.getElementById('input-name');
const inputCompany = document.getElementById('input-company');
const inputEmail = document.getElementById('input-email');
const inputMessage = document.getElementById('input-message');
const formContact = document.getElementById('form-contact');
const courses = document.getElementById('courses');
const status = document.getElementById('status');
const loadingSpinner = document.getElementById('loading-spinner');

// *********************** Add Toggle evens to close menu ***********************

// toggle ul in mobile menu
function addNewEvent(...target) {
  target.forEach(e => {
    e.addEventListener('click', function() {
      navMenu.classList.toggle('toggle-scale');
      iconMenu.classList.toggle('hidden');
      iconMenuCose.classList.toggle('hidden');
    });
  });
}

// toggle nav in bouth sizes
let lastScrollPosition = 0;
let currentScrollPosition = '';
window.addEventListener('scroll', function() {
  currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollPosition < 0) {
    return;
  }
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 60) {
    return;
  }
  if (currentScrollPosition > lastScrollPosition) {
    hiddenMenu.classList.add('toggle-scale', 'toggle-scale-desktop');
    console.log(hiddenMenu);
  } else {
    hiddenMenu.classList.remove('toggle-scale', 'toggle-scale-desktop');
  }
  lastScrollPosition = currentScrollPosition;
});

addNewEvent(iconMenu, iconMenuCose);

// *********************** ajax e-mail submition ***********************

function ajax(method, url, data, success, error) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success();
    } else {
      error();
    }
  };
  xhr.send(data);
}

formContact.addEventListener('submit', function(event) {
  event.preventDefault();

  function hiddenMesage() {
    setTimeout(() => {
      status.style = 'visibility: hidden;';
    }, 3000);
  }

  // Success and Error functions for after the form is submitted
  function success(message = 'Success! Thanks for your contact') {
    formContact.reset();
    loadingSpinner.style = 'display: none';
    status.style = 'background: #77cda9';
    status.innerHTML = message;
    hiddenMesage();
  }

  function error(message = 'Oops! There was a problem. Try again later') {
    loadingSpinner.style = 'display: none ';
    status.style = 'background: #e95858';
    status.innerHTML = message;
    hiddenMesage();
  }
  // form validation
  if (
    inputName.value.length === 0 ||
    inputCompany.value.length === 0 ||
    inputEmail.value.length === 0 ||
    inputMessage.value.length === 0
  ) {
    error('All fields is required');
    // status.append('All fields is required');
  } else {
    // handle the form submission event
    loadingSpinner.style = 'display: flex ';
    const data = new FormData(formContact);
    ajax(formContact.method, formContact.action, data, success, error);
  }
});

// *********************** add data to template of course list ***********************
function template(model) {
  return `${Object.keys(model)
    .map(
      m => `
    <div class="certificator">
    <h3>${m}</h3>
        ${model[m]
          .map(
            e => `
          <p>
            ${e.name}
            <a href="${e.certificate}"> link </a>
          </p>`
          )
          .join('')}
    </div>
    `
    )
    .join('')}
  `;
}

// *********************** mock data for template of course list ***********************

const myCourses = {
  Javascript: [
    {
      name: 'JavaScript: Programando na linguagem da web',
      certificate:
        'https://cursos.alura.com.br/certificate/f35c7e43-e29f-4495-aa44-4b3593ccb7d3'
    },
    {
      name:
        'JavaScript avançado I: ES6, orientação a objetos e padrões de projetos',
      certificate:
        'https://cursos.alura.com.br/certificate/bf3cf758-88cb-4c62-ba73-b43126b36cc0'
    },
    {
      name:
        'JavaScript Avançado II: ES6, orientação a objetos e padrões de projetos',
      certificate:
        'https://cursos.alura.com.br/certificate/234062c4-14c9-4078-a8fe-5e4fed1aa98c'
    },
    {
      name:
        'JavaScript Avançado III: ES6, orientação a objetos e padrões de projetos',
      certificate:
        'https://cursos.alura.com.br/certificate/5b8f0ade-5d85-417e-aa77-92b213d0841'
    },
    {
      name: 'jQuery: Manipulação dinâmica de conteúdo',
      certificate:
        'https://cursos.alura.com.br/certificate/8da8c68a-be38-4b8c-818d-1d416170c6af'
    },
    {
      name: 'jQuery: Avance na biblioteca mais popular do mercado parte 2',
      certificate:
        'https://cursos.alura.com.br/certificate/2f9edd6c-6fad-41bc-803e-5e7bae12d931'
    },
    {
      name: 'JavaScript: De padrões a uma abordagem funcional',
      certificate:
        'https://cursos.alura.com.br/certificate/721037b2-8996-4c1f-8517-cf99958e9376'
    },
    {
      name: 'JavaScript: De padrões a uma abordagem funcional',
      certificate:
        'https://cursos.alura.com.br/certificate/721037b2-8996-4c1f-8517-cf99958e9376'
    },
    {
      name: 'Vue.js parte 1: construindo Single Page Applications',
      certificate:
        'https://cursos.alura.com.br/certificate/47a296c2-ee6a-46d5-844b-4b0735a86a61'
    },
    {
      name: 'Vue.js parte 2: construindo Single Page Applications',
      certificate:
        'https://cursos.alura.com.br/certificate/24d7002e-844e-46b7-a315-1c5017aadb7e'
    },
    {
      name: 'Electron: Crie aplicativos Desktop com as tecnologias da Web',
      certificate:
        'https://cursos.alura.com.br/certificate/ebb536f4-372e-4d7e-9692-99c0cc7e221f'
    }
  ],
  FrontEnd: [
    {
      name: 'HTML e CSS: Os seus primeiros passos',
      certificate:
        'https://cursos.alura.com.br/certificate/97f143a2-978b-47f2-b3e1-afeedcbc60c3'
    },
    {
      name: 'HTML5 e CSS3 I: Suas primeiras páginas da Web',
      certificate:
        'https://cursos.alura.com.br/certificate/3b5b9b2e-85d9-4f60-8739-8ef6e920b135'
    },
    {
      name: 'HTML5 e CSS3 II: Turbinando as suas páginas',
      certificate:
        'https://cursos.alura.com.br/certificate/d0b518c1-e64b-45e1-b72f-f234b815b1d4'
    },
    {
      name: 'Sass e Compass: Descomplicando o CSS',
      certificate:
        'https://cursos.alura.com.br/certificate/244a54b0-1b8a-465b-b434-daeca96a5d83'
    }
  ],
  java: [
    {
      name: 'Java: Dominando as Collections',
      certificate:
        'https://cursos.alura.com.br/certificate/18b8915c-55ff-41bb-8dc9-1440b803c9fe'
    },
    {
      name: 'Java II: Orientação a Objetos',
      certificate:
        'https://cursos.alura.com.br/certificate/3268c709-0eed-4558-a5c0-f8db4f3dd8db'
    },
    {
      name: 'Java III: Principais APIs e bibliotecas',
      certificate:
        'https://cursos.alura.com.br/certificate/173bcc8d-7e06-44db-9110-5b0c1806f27f'
    },
    {
      name: 'Design Patterns Java I: Boas práticas de programação',
      certificate:
        'https://cursos.alura.com.br/certificate/1884ab19-03fa-470d-a331-0429311bc6de'
    },
    {
      name: 'Design Patterns Java II: Boas praticas de programação',
      certificate:
        'https://cursos.alura.com.br/certificate/d991841d-3a6e-430b-b1fc-1549d1d5c811'
    },
    {
      name: 'Design Patterns Java II: Boas praticas de programação',
      certificate:
        'https://cursos.alura.com.br/certificate/d991841d-3a6e-430b-b1fc-1549d1d5c811'
    },
    {
      name: 'Java 8: Tire proveito dos novos recursos da linguagem',
      certificate:
        'https://cursos.alura.com.br/certificate/ee818f40-dbd2-451c-98ec-d02c52ebc8b9'
    },
    {
      name: 'Java e JDBC: Trabalhando com um banco de dados',
      certificate:
        'https://cursos.alura.com.br/certificate/be0d6fbe-fa6c-411e-b736-b2bc8e0740dc'
    },
    {
      name: 'Java e JPA: Persista seus objetos com a JPA2 e Hibernate',
      certificate:
        'https://cursos.alura.com.br/certificate/de2a029e-373b-43b0-81ca-44e29ca14e75'
    },
    {
      name: 'Java e JSTL: Tags para facilitar o desenvolvimento JSP',
      certificate:
        'https://cursos.alura.com.br/certificate/ca164531-7bbd-4d8f-84d5-14e74b184354'
    },
    {
      name: 'Threads 2: Programação concorrente avançada',
      certificate:
        'https://cursos.alura.com.br/certificate/a17f1b7f-e0f8-401b-ac12-434b5ddb8c05'
    }
  ],
  backEnd: [
    {
      name: 'Node.js e HTTP: desenvolvendo uma API seguindo o estilo REST',
      certificate:
        'https://cursos.alura.com.br/certificate/9abb04d5-fd62-4940-b1d9-4efa9d3989fa'
    },
    {
      name: 'Node.js: Inovando com Javascript no backend',
      certificate:
        'https://cursos.alura.com.br/certificate/87f73701-687a-4bb2-8363-b57008b7b11a'
    },
    {
      name: 'Spring MVC II: Integração, cache, segurança e templates',
      certificate:
        'https://cursos.alura.com.br/certificate/de560f7c-dcdc-440d-82f6-25d7d4e7490e'
    },
    {
      name: 'Spring MVC I: Criando aplicações web',
      certificate:
        'https://cursos.alura.com.br/certificate/92cf3846-4c85-455f-beac-ac7791c57c77'
    },
    {
      name: 'Servlets: Fundamentos de Java na Web',
      certificate:
        'https://cursos.alura.com.br/certificate/21a11cff-f253-4757-8d41-352e7b1cb35a'
    }
  ],
  typescript: [
    {
      name: 'TypeScript parte 1: Evoluindo seu Javascript',
      certificate:
        'https://cursos.alura.com.br/certificate/a500b310-0bf1-4021-a7b8-4880c6e5adee'
    },
    {
      name: 'TypeScript parte 2: Mais técnicas e boas práticas',
      certificate:
        'https://cursos.alura.com.br/certificate/60f1464f-b0b8-49d8-a05e-f725d6f26edf'
    }
  ],
  tools: [
    {
      name: 'Docker: Criando containers sem dor de cabeça',
      certificate:
        'https://cursos.alura.com.br/certificate/2192431b-a6ff-412c-b8e6-da848bbd2d40'
    },
    {
      name: 'Git: Controle e compartilhe seu código',
      certificate:
        'https://cursos.alura.com.br/certificate/c0cc7879-6c1f-407e-ac05-90216e403816'
    },
    {
      name: 'UML Introdução: Modelagem de soluções',
      certificate:
        'https://cursos.alura.com.br/certificate/4f83f9e8-6b8a-4271-82a6-4123f3bff348'
    },
    {
      name: 'Expressões regulares: Capturando textos de forma mágica',
      certificate:
        'https://cursos.alura.com.br/certificate/d3862895-286b-4f64-89ec-0a10670fe1b1'
    },
    {
      name: 'Cordova & PhoneGap: Apps mobile com HTML, CSS e JS',
      certificate:
        'https://cursos.alura.com.br/certificate/902af215-55bb-4c76-a660-6c5a4508d1ad'
    }
  ],
  DataBases: [
    {
      name: 'MongoDB: Uma alternativa aos bancos relacionais tradicionais',
      certificate:
        'https://cursos.alura.com.br/certificate/60858d56-0638-4f08-b2ea-5f14aedc54c5'
    },
    {
      name: 'MySQL I: Iniciando suas consultas',
      certificate:
        'https://cursos.alura.com.br/certificate/8e04aaf9-cae3-464a-a08c-c9ef817b3d6a'
    }
  ]
};

courses.innerHTML = template(myCourses);
