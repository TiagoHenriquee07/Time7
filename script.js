document.addEventListener('DOMContentLoaded', function() {
    
    // --- Dados do Time 7 (Para o Modal da Home) ---
    const team7MembersData = {
        naruto: {
            name: "Naruto Uzumaki",
            image: "img/narutin.jpg",
            description: "O Sétimo Hokage. Sua jornada é de um párias à Sombra do Fogo. Movido por um espírito indomável, ele se torna o herói da Quarta Guerra Shinobi e o líder de Konoha.",
            skills: [
                "<strong>Rasengan e variações:</strong> A técnica de Rank-A que se tornou sua marca.",
                "<strong>Modo Sábio e Kurama Chakra Mode:</strong> Poderes que o elevam a um nível divino.",
                "<strong>Kage Bunshin no Jutsu:</strong> Usado para treinar, lutar e pensar simultaneamente."
            ],
            legacy: "Sua filosofia de 'Nunca Desistir' e seu poder de mudar o coração dos inimigos o tornam o ninja mais influente de sua era. Ele trouxe paz ao mundo shinobi."
        },
        sasuke: {
            name: "Sasuke Uchiha",
            image: "img/sasuke.jpg",
            description: "O último membro sobrevivente do clã Uchiha. Inicialmente consumido pela vingança, ele encontra a redenção e se torna o suporte sombrio e protetor de Konoha.",
            skills: [
                "<strong>Sharingan, Mangekyo e Rinnegan:</strong> O mais poderoso Dojutsu, concedendo técnicas oculares supremas (Amaterasu, Susano'o, Amenotejikara).",
                "<strong>Chidori e variações:</strong> A técnica de relâmpago de seu mestre, Kakashi.",
                "<strong>Ninjutsu de Liberação de Chamas:</strong> Especialista em técnicas de Fogo."
            ],
            legacy: "Representa a escuridão e a luz que podem coexistir em um ninja. Sua rivalidade com Naruto foi o motor da série. Hoje, ele atua nas sombras para proteger a aldeia, redimindo os erros do passado de seu clã."
        },
        sakura: {
            name: "Sakura Haruno",
            image: "img/sakura.jpg",
            description: "De uma Genin comum a uma das maiores ninjas médicas da história. Sakura é a força e a inteligência do Time 7, uma Kunoichi essencial e discípula de Tsunade.",
            skills: [
                "<strong>Ninjutsu Médico Avançado:</strong> Habilidade incomparável em cura e cirurgia de emergência.",
                "<strong>Força Monstruosa:</strong> Controle de Chakra preciso concentrado no punho para golpes devastadores.",
                "<strong>Byakugou no Jutsu:</strong> Técnica de Regeneração Suprema, tornando-a quase imortal em batalha."
            ],
            legacy: "Prova que o trabalho duro supera o gênio inato. Ela é a fundadora e líder do Hospital Infantil de Konoha e um pilar de força na comunidade ninja."
        },
        kakashi: {
            name: "Kakashi Hatake",
            image: "img/kakashi.jpg",
            description: "O Sexto Hokage. Conhecido como o 'Ninja Copiador' por seu Sharingan e vasto arsenal de Jutsus. Seu passado trágico o moldou em um líder sábio e um mentor inestimável.",
            skills: [
                "<strong>Sharingan/Mangekyo Sharingan:</strong> Copiou mais de mil Jutsus e domina o Kamui (distorção espacial).",
                "<strong>Raikiri/Chidori:</strong> Sua técnica original de relâmpago concentrado.",
                "<strong>Liderança e Estratégia:</strong> Sua mente é tão afiada quanto seu Raikiri, sendo um mestre tático."
            ],
            legacy: "Superou perdas pessoais para se tornar um dos Hokages mais respeitados. Seu legado reside na formação da nova geração que salvou o mundo shinobi."
        }
    };

    // --- Funcionalidade do Modal do Time 7 ---
    const memberModal = document.getElementById('memberModal');
    if (memberModal) {
        memberModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const memberId = button.getAttribute('data-member');
            const memberData = team7MembersData[memberId];

            if (memberData) {
                document.getElementById('modalMemberImage').src = memberData.image;
                document.getElementById('modalMemberImage').alt = memberData.name;
                document.getElementById('modalMemberName').textContent = memberData.name;
                document.getElementById('modalMemberDescription').textContent = memberData.description;

                const skillsList = document.getElementById('modalMemberSkills');
                skillsList.innerHTML = '';
                memberData.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-star me-2 text-orange"></i>${skill}`;
                    skillsList.appendChild(li);
                });

                document.getElementById('modalMemberLegacy').textContent = memberData.legacy;
            }
        });
    }

    // --- SCROLL SUAVE PARA TODOS OS LINKS DA PÁGINA ---
    // (Isso funciona tanto na Index quanto na página de História)
    const headerHeight = document.querySelector('.custom-navbar') ? document.querySelector('.custom-navbar').offsetHeight : 0;
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]'); 

    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Verifica se é um link de âncora local (ex: #home)
            if (href.startsWith('#') && href.length > 1) { 
                e.preventDefault(); 
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    // Subtrai a altura do menu para não tapar o título
                    const offsetPosition = elementPosition - headerHeight; 

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            } 

            // Fechar o menu de navegação em mobile
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // Ativa o link da navbar conforme o scroll (Apenas se as seções existirem, ex: na Home)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.custom-nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const activateNavLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50; 
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href.includes(current) && href.startsWith('#')) {
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', activateNavLink);
        activateNavLink();
    }
});