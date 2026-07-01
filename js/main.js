// Feeldiz DI Studio - Main JavaScript File
// Enhanced with error handling and optimized for production

// Environment detection
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Console wrapper for production (disable console in production)
const logger = {
    log: isDevelopment ? logger.log.bind(console) : () => {},
    error: isDevelopment ? logger.error.bind(console) : () => {},
    warn: isDevelopment ? logger.warn.bind(console) : () => {}
};

// Fallback placeholder for failed image loads
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage Not Available%3C/text%3E%3C/svg%3E';

// 작품별 수상 데이터
const awardsData = {
    cake: [],
    eden: [],
    percent: [],
    moviefan: [
        { festival: 'Jeolla누벨바그영화제', award: '장려상' }
    ],
    wronggirl: [
        { festival: '제50회 서울독립영화제 (2024)', award: '관객상 수상' },
        { festival: '제22회 청주국제단편영화제 (2024)', award: '배우상 수상' },
        { festival: '제천국제음악영화제', award: '초청 상영' },
        { festival: '여수국제웹드라마영화제', award: '초청 상영' }
    ],
    workshop3: [],
    caution: [
        { festival: '제천국제음악영화제', award: '상영' }
    ],
    mung: [
        { festival: '브라질 한국 영화제', award: '경쟁부문' }
    ],
    stain: [
        { festival: '25회 전주국제영화제', award: '코리안시네마' },
        { festival: '18회 안양여성인원 영화제', award: '초청작' },
        { festival: '25회 제주여성영화제', award: '본선' },
        { festival: '목포국도 1호성 영화제', award: '초청' },
        { festival: '브라질 한국 영화제', award: '경쟁부문' },
        { festival: '제천국제음악영화제', award: '메이드인제천' },
        { festival: '전북여성영화제', award: '초청' },
        { festival: '꽃심어린이청소년영화제', award: '대상' },
        { festival: '무비블록 단편영화제', award: '본선' }
    ],
    uriduri: [],
    cleanzone: [
        { festival: '4회 울산단편영화제', award: '감독상' },
        { festival: '2회 합천수려한영화제', award: '초청' }
    ],
    holiday: [],
    openyoursense: [],
    bichang: [
        { festival: '17회 제천국제음악영화제', award: '경쟁부문' },
        { festival: '22회 대한민국 청소년 영화제', award: '본선' },
        { festival: '17회 대학영화제', award: '본선' },
        { festival: '5회 미사리음악영화제', award: '본선' }
    ],
    portrait: [
        { festival: '1회 코닥어패럴영화제', award: '초청작' },
        { festival: '1회 동대문단편영화제', award: '본선' }
    ],
    bravolife: [
        { festival: '제천국제영화제', award: '메이드인 제천' },
        { festival: '충무로단편독립영화제', award: '본선' },
        { festival: '6회 우리나라 가장동쪽영화제', award: '공식초청' },
        { festival: '18회 정읍전국실버 영화제', award: '본선' },
        { festival: '5회 제주무비콘서트 페스티벌', award: '국내단편' },
        { festival: '서울여성독립영화제', award: '경쟁부문' }
    ],
    harmful: [
        { festival: '제 3회 울산단편영화제', award: '본선' }
    ]
};

const worksData = [
    // 상단 고정: 착한사나이(1)
    {title: "착한사나이", type: "drama", year: "2025", platform: "JTBC/Disney+", representativeImage: "GM.jpg"},
    {title: "묘르는 사람", type: "short", year: "2025", filmId: "cat", category: "단편", representativeImage: "cat/cat_1.jpg"},
    {title: "말할수없는나의신부", type: "drama", year: "2026", filmId: "vgloo", representativeImage: "vgloo/260604.005.png"},
    {title: "교육부 캠페인", type: "commercial", year: "2026", filmId: "probedu", category: "광고", representativeImage: "probedu/probedu_3.jpeg"},
    {title: "이사이", type: "short", year: "2026", filmId: "beside", category: "단편", representativeImage: "Beside/beside_4.jpg"},
    {title: "사부작사부작", type: "commercial", year: "2025", category: "광고", youtubeUrl: "https://www.youtube.com/@%EC%82%AC%EB%B6%80%EC%9E%91-x6p4y", representativeImage: "FL%20thumb.jpg"},

    // Feature/Short
    {title: "비밀일수밖에", type: "feature", year: "2025", platform: "Netflix", category: "독립장편", representativeImage: "secert_1.jpg"},
    {title: "영의 확률", type: "short", year: "2025", filmId: "percent", category: "단편", representativeImage: "percent_709/percent_1.jpg"},

    // Commercial
    {title: "서울시자살예방캠페인 '시그널'", type: "commercial", year: "2025", category: "공익광고", representativeImage: "prob_1.jpg"},

    // Film - 순서: 제비 → Cake → 에덴 → 선이 → 그릇된 소녀(1) → 베란다(2) → 가문의영광(3) → 만추(4) → 수상내역 많은 순
    {title: "제비", type: "short", year: "2025", filmId: "jevi", category: "단편", representativeImage: "jevi1.jpg"},
    {title: "Cake", type: "short", year: "2025", filmId: "cake", category: "단편", representativeImage: "cake_1.png"},
    {title: "에덴", type: "short", year: "2025", filmId: "eden", category: "단편", representativeImage: "Eden/Eden_1.jpg"},
    {title: "선이", type: "short", year: "2025", filmId: "sune", category: "단편", representativeImage: "sune1.jpg"},
    {title: "그릇된 소녀", type: "short", year: "2025", filmId: "wronggirl", category: "독립장편", representativeImage: "after11.jpg"},
    {title: "베란다", type: "feature", year: "2026", category: "상업영화"},
    {title: "가문의영광", type: "feature", year: "2023", category: "상업영화", representativeImage: "after19.jpg"},
    {title: "만추", type: "feature", year: "2023 Remaster", category: "상업영화"},
    {title: "얼룩", type: "short", year: "2023", filmId: "stain", category: "단편"},
    {title: "브라보 마이라이프", type: "short", year: "2021", filmId: "bravolife", category: "단편"},
    {title: "비창", type: "short", year: "2021", filmId: "bichang", category: "단편"},
    {title: "청정구역", type: "short", year: "2022", filmId: "cleanzone", category: "단편"},
    {title: "초상", type: "short", year: "2021", filmId: "portrait", category: "단편"},
    {title: "우리동네영화광", type: "feature", year: "2024", filmId: "moviefan", category: "독립장편", representativeImage: "KU_1.jpg"},
    {title: "취급주의", type: "short", year: "2024", filmId: "caution", category: "단편"},
    {title: "멍", type: "short", year: "2024", filmId: "mung", category: "단편"},
    {title: "유해한 녀석들", type: "short", year: "2020", filmId: "harmful", category: "단편"},
    {title: "BlackSnake", type: "feature", year: "2025", category: "독립장편", representativeImage: "BS3.jpg"},
    {title: "워크숍 3", type: "short", year: "2025", filmId: "workshop3", category: "단편"},
    {title: "환영", type: "short", year: "2024", category: "단편", representativeImage: "after2.jpg"},
    {title: "로망스", type: "feature", year: "2024", category: "독립장편", representativeImage: "after16.jpg"},
    {title: "우리두리", type: "short", year: "2022", filmId: "uriduri", category: "단편"},
    {title: "휴일", type: "short", year: "2021", filmId: "holiday", category: "단편"},
    {title: "오픈유어센스", type: "short", year: "2021", filmId: "openyoursense", category: "단편"},

    // M/V - moved to the end
    {title: "Gardener", artist: "클라우디안", type: "mv", year: "2025", category: "뮤직비디오", representativeImage: "cloud_3.jpg"},
    {title: "Legend Comes To Life", artist: "클라우디안", type: "mv", year: "2025", category: "뮤직비디오"}
];

function renderWorks(filter = 'film', subcategory = 'all') {
    try {
        const worksGrid = document.getElementById('worksGrid');
        if (!worksGrid) {
            logger.error('worksGrid element not found');
            return;
        }

        worksGrid.innerHTML = '';
        let filteredWorks;

        if (filter === 'drama') {
            filteredWorks = worksData.filter(work => work.type === 'drama');
        } else if (filter === 'commercial') {
            filteredWorks = worksData.filter(work => work.type === 'commercial');
        } else if (filter === 'mv') {
            filteredWorks = worksData.filter(work => work.type === 'mv');
        } else if (filter === 'film') {
            filteredWorks = worksData.filter(work => work.type === 'feature' || work.type === 'short');

            // Apply subcategory filter for film
            if (subcategory !== 'all') {
                filteredWorks = filteredWorks.filter(work => work.category === subcategory);
            }
        } else {
            filteredWorks = [];
        }

        logger.log('Works filter:', filter, 'Subcategory:', subcategory, 'Filtered works:', filteredWorks);

        filteredWorks.forEach(work => {
            try {
                const workCard = document.createElement('div');
                workCard.className = 'work-card';

                const filmId = work.filmId || work.title.toLowerCase().replace(/\s+/g, '').replace(/[[\]]/g, '');
                const hasAwards = awardsData[filmId] && awardsData[filmId].length > 0;

                // Add click event to show work images
                workCard.addEventListener('click', (e) => {
                    // If has awards badge, show awards; otherwise show images
                    if (hasAwards && e.target.closest('.work-awards-badge')) {
                        showAwards(filmId, work.title);
                    } else {
                        showWorkImages(work);
                    }
                });

                const awardsHTML = hasAwards ?
                    `<div class="work-awards-badge">🏆 수상작 (클릭하여 상세보기)</div>` : '';

                const categoryHTML = work.category ?
                    `<div class="work-category">${work.category}</div>` : '';

                const platformHTML = work.platform ?
                    `<div class="work-platform">${work.platform}</div>` : '';

                const artistHTML = work.artist ?
                    `<div class="work-artist">${work.artist}</div>` : '';

                workCard.innerHTML = `
                    <h3 class="work-title">${work.title}</h3>
                    ${artistHTML}
                    ${platformHTML}
                    ${categoryHTML}
                    <div class="work-year">${work.year}</div>
                    ${awardsHTML}
                `;

                worksGrid.appendChild(workCard);
            } catch (error) {
                logger.error('Error rendering work card for:', work.title, error);
            }
        });
    } catch (error) {
        logger.error('Error in renderWorks:', error);
    }
}

function showAwards(filmId, title) {
    try {
        const awards = awardsData[filmId];
        if (!awards || awards.length === 0) {
            logger.log('No awards found for filmId:', filmId);
            return;
        }

        const modal = document.getElementById('awardsModal');
        const modalTitle = document.getElementById('modalAwardsTitle');
        const awardsList = document.getElementById('modalAwardsList');

        if (!modal || !modalTitle || !awardsList) {
            logger.error('Awards modal elements not found');
            return;
        }

        modalTitle.textContent = title;

        awardsList.innerHTML = awards.map(award => `
            <div class="award-entry">
                <div class="award-festival">${award.festival}</div>
                <div class="award-name">${award.award}</div>
            </div>
        `).join('');

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        logger.error('Error in showAwards:', error);
    }
}

function showProjectDetailPage(project) {
    try {
        // Find matching images in portfolioData
        let matchTitle = project.title;
        if (project.artist) {
            matchTitle = `${project.title} ${project.artist}`;
        }

        // Try exact match first
        let projectImages = portfolioData.filter(item => {
            if (project.artist) {
                return item.description === project.title ||
                       item.description === matchTitle ||
                       item.description === `${project.title} ${project.artist}`;
            }
            return item.description === project.title;
        });

        // If no images found, try without artist for M/V
        if (projectImages.length === 0 && project.artist) {
            projectImages = portfolioData.filter(item => item.description.includes(project.title));
        }

        if (projectImages.length === 0) {
            logger.log('No images found for project:', project.title);
            alert('이 작품의 이미지가 아직 업로드되지 않았습니다.');
            return;
        }

        const modal = document.getElementById('workImagesModal');
        const modalTitle = document.getElementById('workImagesTitle');
        const workImagesGrid = document.getElementById('workImagesGrid');
        const paginationContainer = document.querySelector('.work-images-pagination');

        if (!modal || !modalTitle || !workImagesGrid) {
            logger.error('Project detail modal elements not found');
            return;
        }

        // Set title with artist if M/V
        if (project.artist) {
            modalTitle.textContent = `${project.title} - ${project.artist}`;
        } else {
            modalTitle.textContent = project.title;
        }

        // Hide pagination for 2-column grid view
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }

        // Render all images in 2-column grid layout
        workImagesGrid.className = 'work-images-two-column-grid';
        workImagesGrid.innerHTML = projectImages.map(item => `
            <img src="${item.image}" alt="${item.description}">
        `).join('');

        // Add click event to images to open in full modal
        workImagesGrid.querySelectorAll('img').forEach((img, idx) => {
            img.addEventListener('click', () => {
                openImageModal(projectImages, idx);
            });
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        logger.error('Error in showProjectDetailPage:', error);
    }
}

function showWorkImages(work) {
    try {
        // Find matching images in portfolioData
        // For M/V works, match against the full title with artist
        let matchTitle = work.title;
        if (work.artist) {
            // For M/V, portfolio description might be "Gardener 클라우디안"
            matchTitle = `${work.title} ${work.artist}`;
        }

        // Try exact match first
        let workImages = portfolioData.filter(item => {
            if (work.artist) {
                // For M/V, check both formats
                return item.description === work.title ||
                       item.description === matchTitle ||
                       item.description === `${work.title} ${work.artist}`;
            }
            return item.description === work.title;
        });

        // If no images found, try without artist for M/V
        if (workImages.length === 0 && work.artist) {
            workImages = portfolioData.filter(item => item.description.includes(work.title));
        }

        if (workImages.length === 0) {
            logger.log('No images found for work:', work.title);
            alert('이 작품의 이미지가 아직 업로드되지 않았습니다.');
            return;
        }

        AppState.currentWorkImages = workImages;
        AppState.currentWorkPage = 0;

        const modal = document.getElementById('workImagesModal');
        const modalTitle = document.getElementById('workImagesTitle');

        if (!modal || !modalTitle) {
            logger.error('Work images modal elements not found');
            return;
        }

        // Set title with artist if M/V
        if (work.artist) {
            modalTitle.textContent = `${work.title} - ${work.artist}`;
        } else {
            modalTitle.textContent = work.title;
        }

        renderWorkImagesPage();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        logger.error('Error in showWorkImages:', error);
    }
}

function renderWorkImagesPage() {
    try {
        const grid = document.getElementById('workImagesGrid');
        const pageInfo = document.getElementById('workImagesPageInfo');
        const prevBtn = document.getElementById('workImagesPrev');
        const nextBtn = document.getElementById('workImagesNext');

        if (!grid || !pageInfo || !prevBtn || !nextBtn) {
            logger.error('Work images modal elements not found');
            return;
        }

        const imagesPerPage = 9;
        const totalPages = Math.ceil(AppState.currentWorkImages.length / imagesPerPage);
        const startIdx = AppState.currentWorkPage * imagesPerPage;
        const endIdx = Math.min(startIdx + imagesPerPage, AppState.currentWorkImages.length);
        const pageImages = AppState.currentWorkImages.slice(startIdx, endIdx);

        // Render grid
        grid.innerHTML = pageImages.map(item => `
            <img src="${item.image}" alt="${item.description}">
        `).join('');

        // Update pagination
        pageInfo.textContent = `${AppState.currentWorkPage + 1} / ${totalPages} (${AppState.currentWorkImages.length}장)`;
        prevBtn.disabled = AppState.currentWorkPage === 0;
        nextBtn.disabled = AppState.currentWorkPage >= totalPages - 1;

        // Add click events to images to open in gallery modal
        grid.querySelectorAll('img').forEach((img, idx) => {
            img.addEventListener('click', () => {
                const actualIdx = startIdx + idx;
                openImageModal(AppState.currentWorkImages, actualIdx);
            });
        });
    } catch (error) {
        logger.error('Error in renderWorkImagesPage:', error);
    }
}

function openImageModal(images, startIndex) {
    try {
        AppState.currentModalItems = images;
        AppState.currentModalIndex = startIndex;

        // Close work images modal if open
        const workImagesModal = document.getElementById('workImagesModal');
        if (workImagesModal && workImagesModal.style.display === 'block') {
            workImagesModal.style.display = 'none';
        }

        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            showModalContent(images[startIndex]);
            imageModal.style.display = 'block';
        }
    } catch (error) {
        logger.error('Error in openImageModal:', error);
    }
}

function closeWorkImages() {
    try {
        const modal = document.getElementById('workImagesModal');
        const workImagesGrid = document.getElementById('workImagesGrid');
        const paginationContainer = document.querySelector('.work-images-pagination');

        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Reset grid class and show pagination for next use
        if (workImagesGrid) {
            workImagesGrid.className = 'work-images-grid';
        }
        if (paginationContainer) {
            paginationContainer.style.display = 'flex';
        }
    } catch (error) {
        logger.error('Error in closeWorkImages:', error);
    }
}

function closeAwards() {
    try {
        const modal = document.getElementById('awardsModal');
        if (!modal) {
            logger.error('awardsModal element not found');
            return;
        }
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } catch (error) {
        logger.error('Error in closeAwards:', error);
    }
}

function generateGMSeries() {
    try {
        const gmSeries = [];
        gmSeries.push({id: 1, category: "portfolio", image: "GM.jpg", description: "착한사나이"});
        gmSeries.push({id: 2, category: "portfolio", image: "GM2.jpg", description: "착한사나이"});
        gmSeries.push({id: 3, category: "portfolio", image: "GM3.jpg", description: "착한사나이"});
        gmSeries.push({id: 4, category: "portfolio", image: "GM4.jpg", description: "착한사나이"});
        for (let i = 1; i <= 137; i++) {
            gmSeries.push({id: i + 4, category: "portfolio", image: `GM_${i}.jpg`, description: "착한사나이"});
        }
        return gmSeries;
    } catch (error) {
        logger.error('Error in generateGMSeries:', error);
        return [];
    }
}

const portfolioData = [
    // 제비
    {id: 250, category: "portfolio", image: "jevi1.jpg", description: "제비", type: "short"},
    {id: 251, category: "portfolio", image: "jevi2.jpg", description: "제비", type: "short"},
    {id: 252, category: "portfolio", image: "jevi3.jpg", description: "제비", type: "short"},
    {id: 253, category: "portfolio", image: "jevi4.jpg", description: "제비", type: "short"},
    {id: 254, category: "portfolio", image: "jevi5.jpg", description: "제비", type: "short"},
    {id: 255, category: "portfolio", image: "jevi6.jpg", description: "제비", type: "short"},
    {id: 256, category: "portfolio", image: "jevi7.jpg", description: "제비", type: "short"},
    {id: 257, category: "portfolio", image: "jevi8.jpg", description: "제비", type: "short"},
    {id: 258, category: "portfolio", image: "jevi9.jpg", description: "제비", type: "short"},
    {id: 259, category: "portfolio", image: "jevi10.jpg", description: "제비", type: "short"},
    {id: 260, category: "portfolio", image: "jevi11.jpg", description: "제비", type: "short"},
    {id: 261, category: "portfolio", image: "jevi12.jpg", description: "제비", type: "short"},
    {id: 262, category: "portfolio", image: "jevi13.jpg", description: "제비", type: "short"},
    {id: 263, category: "portfolio", image: "jevi14.jpg", description: "제비", type: "short"},
    {id: 264, category: "portfolio", image: "jevi15.jpg", description: "제비", type: "short"},
    {id: 265, category: "portfolio", image: "jevi16.jpg", description: "제비", type: "short"},
    {id: 266, category: "portfolio", image: "jevi17.jpg", description: "제비", type: "short"},
    {id: 267, category: "portfolio", image: "jevi18.jpg", description: "제비", type: "short"},
    {id: 268, category: "portfolio", image: "jevi19.jpg", description: "제비", type: "short"},
    {id: 269, category: "portfolio", image: "jevi20.jpg", description: "제비", type: "short"},
    // Cake
    {id: 491, category: "portfolio", image: "cake_1.png", description: "Cake", type: "short"},
    {id: 492, category: "portfolio", image: "cake_2.png", description: "Cake", type: "short"},
    {id: 493, category: "portfolio", image: "cake_3.png", description: "Cake", type: "short"},
    {id: 494, category: "portfolio", image: "cake_4.png", description: "Cake", type: "short"},
    {id: 495, category: "portfolio", image: "cake_5.png", description: "Cake", type: "short"},
    {id: 496, category: "portfolio", image: "cake_6.png", description: "Cake", type: "short"},
    {id: 497, category: "portfolio", image: "cake_7.png", description: "Cake", type: "short"},
    {id: 498, category: "portfolio", image: "cake_8.png", description: "Cake", type: "short"},
    {id: 499, category: "portfolio", image: "cake_9.png", description: "Cake", type: "short"},
    {id: 500, category: "portfolio", image: "cake_10.png", description: "Cake", type: "short"},
    {id: 501, category: "portfolio", image: "cake_11.png", description: "Cake", type: "short"},
    {id: 502, category: "portfolio", image: "cake_12.png", description: "Cake", type: "short"},
    {id: 503, category: "portfolio", image: "cake_13.png", description: "Cake", type: "short"},
    {id: 504, category: "portfolio", image: "cake_14.png", description: "Cake", type: "short"},
    {id: 505, category: "portfolio", image: "cake_15.png", description: "Cake", type: "short"},
    {id: 506, category: "portfolio", image: "cake_16.png", description: "Cake", type: "short"},
    {id: 507, category: "portfolio", image: "cake_17.png", description: "Cake", type: "short"},
    {id: 508, category: "portfolio", image: "cake_18.png", description: "Cake", type: "short"},
    {id: 509, category: "portfolio", image: "cake_19.png", description: "Cake", type: "short"},
    {id: 510, category: "portfolio", image: "cake_20.png", description: "Cake", type: "short"},
    {id: 511, category: "portfolio", image: "cake_21.png", description: "Cake", type: "short"},
    {id: 512, category: "portfolio", image: "cake_22.png", description: "Cake", type: "short"},
    {id: 513, category: "portfolio", image: "cake_23.png", description: "Cake", type: "short"},
    {id: 514, category: "portfolio", image: "cake_24.png", description: "Cake", type: "short"},
    {id: 515, category: "portfolio", image: "cake_25.png", description: "Cake", type: "short"},
    // 에덴
    {id: 516, category: "portfolio", image: "Eden/Eden_1.jpg", description: "에덴", type: "short"},
    {id: 517, category: "portfolio", image: "Eden/Eden_2.jpg", description: "에덴", type: "short"},
    {id: 518, category: "portfolio", image: "Eden/Eden_3.jpg", description: "에덴", type: "short"},
    {id: 519, category: "portfolio", image: "Eden/Eden_4.jpg", description: "에덴", type: "short"},
    {id: 520, category: "portfolio", image: "Eden/Eden_5.jpg", description: "에덴", type: "short"},
    {id: 521, category: "portfolio", image: "Eden/Eden_6.jpg", description: "에덴", type: "short"},
    {id: 522, category: "portfolio", image: "Eden/Eden_7.jpg", description: "에덴", type: "short"},
    {id: 523, category: "portfolio", image: "Eden/Eden_8.jpg", description: "에덴", type: "short"},
    {id: 524, category: "portfolio", image: "Eden/Eden_9.jpg", description: "에덴", type: "short"},
    {id: 525, category: "portfolio", image: "Eden/Eden_10.jpg", description: "에덴", type: "short"},
    {id: 526, category: "portfolio", image: "Eden/Eden_11.jpg", description: "에덴", type: "short"},
    {id: 527, category: "portfolio", image: "Eden/Eden_12.jpg", description: "에덴", type: "short"},
    {id: 528, category: "portfolio", image: "Eden/Eden_13.jpg", description: "에덴", type: "short"},
    {id: 529, category: "portfolio", image: "Eden/Eden_14.jpg", description: "에덴", type: "short"},
    // 이사이
    {id: 600, category: "portfolio", image: "Beside/beside_1.jpg", description: "이사이", type: "short"},
    {id: 601, category: "portfolio", image: "Beside/beside_2.jpg", description: "이사이", type: "short"},
    {id: 602, category: "portfolio", image: "Beside/beside_3.jpg", description: "이사이", type: "short"},
    {id: 603, category: "portfolio", image: "Beside/beside_4.jpg", description: "이사이", type: "short"},
    {id: 604, category: "portfolio", image: "Beside/beside_5.jpg", description: "이사이", type: "short"},
    {id: 605, category: "portfolio", image: "Beside/beside_6.jpg", description: "이사이", type: "short"},
    {id: 606, category: "portfolio", image: "Beside/beside_7.jpg", description: "이사이", type: "short"},
    {id: 607, category: "portfolio", image: "Beside/beside_8.jpg", description: "이사이", type: "short"},
    {id: 608, category: "portfolio", image: "Beside/beside_9.jpg", description: "이사이", type: "short"},
    {id: 609, category: "portfolio", image: "Beside/beside_10.jpg", description: "이사이", type: "short"},
    {id: 610, category: "portfolio", image: "Beside/beside_11.jpg", description: "이사이", type: "short"},
    // 교육부 캠페인
    {id: 611, category: "portfolio", image: "probedu/probedu_1.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 612, category: "portfolio", image: "probedu/probedu_2.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 613, category: "portfolio", image: "probedu/probedu_3.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 614, category: "portfolio", image: "probedu/probedu_5.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 615, category: "portfolio", image: "probedu/probedu_6.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 616, category: "portfolio", image: "probedu/probedu_7.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 617, category: "portfolio", image: "probedu/probedu_8.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 618, category: "portfolio", image: "probedu/probedu_9.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 619, category: "portfolio", image: "probedu/probedu_10.jpeg", description: "교육부 캠페인", type: "commercial"},
    {id: 620, category: "portfolio", image: "probedu/probedu_11.jpeg", description: "교육부 캠페인", type: "commercial"},
    // 말할수없는나의신부
    {id: 621, category: "portfolio", image: "vgloo/260604.001.png", description: "말할수없는나의신부", type: "drama"},
    {id: 622, category: "portfolio", image: "vgloo/260604.002.png", description: "말할수없는나의신부", type: "drama"},
    {id: 623, category: "portfolio", image: "vgloo/260604.003.png", description: "말할수없는나의신부", type: "drama"},
    {id: 624, category: "portfolio", image: "vgloo/260604.004.png", description: "말할수없는나의신부", type: "drama"},
    {id: 625, category: "portfolio", image: "vgloo/260604.005.png", description: "말할수없는나의신부", type: "drama"},
    {id: 626, category: "portfolio", image: "vgloo/260604.006.png", description: "말할수없는나의신부", type: "drama"},
    {id: 627, category: "portfolio", image: "vgloo/260604.007.png", description: "말할수없는나의신부", type: "drama"},
    {id: 628, category: "portfolio", image: "vgloo/260604.008.png", description: "말할수없는나의신부", type: "drama"},
    {id: 629, category: "portfolio", image: "vgloo/260604.009.png", description: "말할수없는나의신부", type: "drama"},
    {id: 630, category: "portfolio", image: "vgloo/260604.010.png", description: "말할수없는나의신부", type: "drama"},
    {id: 631, category: "portfolio", image: "vgloo/260604.011.png", description: "말할수없는나의신부", type: "drama"},
    {id: 632, category: "portfolio", image: "vgloo/260604.012.png", description: "말할수없는나의신부", type: "drama"},
    {id: 633, category: "portfolio", image: "vgloo/260604.013.png", description: "말할수없는나의신부", type: "drama"},
    {id: 634, category: "portfolio", image: "vgloo/260604.014.png", description: "말할수없는나의신부", type: "drama"},
    {id: 635, category: "portfolio", image: "vgloo/260604.015.png", description: "말할수없는나의신부", type: "drama"},
    // 묘르는 사람
    {id: 636, category: "portfolio", image: "cat/cat_1.jpg", description: "묘르는 사람", type: "short"},
    {id: 637, category: "portfolio", image: "cat/cat_2.jpg", description: "묘르는 사람", type: "short"},
    {id: 638, category: "portfolio", image: "cat/cat_3.jpg", description: "묘르는 사람", type: "short"},
    {id: 639, category: "portfolio", image: "cat/cat_4.jpg", description: "묘르는 사람", type: "short"},
    {id: 640, category: "portfolio", image: "cat/cat_5.jpg", description: "묘르는 사람", type: "short"},
    {id: 641, category: "portfolio", image: "cat/cat_6.jpg", description: "묘르는 사람", type: "short"},
    {id: 642, category: "portfolio", image: "cat/cat_7.jpg", description: "묘르는 사람", type: "short"},
    {id: 643, category: "portfolio", image: "cat/cat_8.jpg", description: "묘르는 사람", type: "short"},
    {id: 644, category: "portfolio", image: "cat/cat_9.jpg", description: "묘르는 사람", type: "short"},
    {id: 645, category: "portfolio", image: "cat/cat_10.jpg", description: "묘르는 사람", type: "short"},
    {id: 646, category: "portfolio", image: "cat/cat_11.jpg", description: "묘르는 사람", type: "short"},
    {id: 647, category: "portfolio", image: "cat/cat_12.jpg", description: "묘르는 사람", type: "short"},
    {id: 648, category: "portfolio", image: "cat/cat_13.jpg", description: "묘르는 사람", type: "short"},
    {id: 649, category: "portfolio", image: "cat/cat_14.jpg", description: "묘르는 사람", type: "short"},
    {id: 650, category: "portfolio", image: "cat/cat_15.jpg", description: "묘르는 사람", type: "short"},
    // 선이
    {id: 231, category: "portfolio", image: "sune1.jpg", description: "선이", type: "short"},
    {id: 232, category: "portfolio", image: "sune2.jpg", description: "선이", type: "short"},
    {id: 233, category: "portfolio", image: "sune3.jpg", description: "선이", type: "short"},
    {id: 234, category: "portfolio", image: "sune4.jpg", description: "선이", type: "short"},
    {id: 235, category: "portfolio", image: "sune5.jpg", description: "선이", type: "short"},
    {id: 236, category: "portfolio", image: "sune6.jpg", description: "선이", type: "short"},
    {id: 237, category: "portfolio", image: "sune7.jpg", description: "선이", type: "short"},
    {id: 238, category: "portfolio", image: "sune8.jpg", description: "선이", type: "short"},
    {id: 239, category: "portfolio", image: "sune9.jpg", description: "선이", type: "short"},
    {id: 240, category: "portfolio", image: "sune10.jpg", description: "선이", type: "short"},
    {id: 241, category: "portfolio", image: "sune11.jpg", description: "선이", type: "short"},
    {id: 242, category: "portfolio", image: "sune12.jpg", description: "선이", type: "short"},
    {id: 243, category: "portfolio", image: "sune13.jpg", description: "선이", type: "short"},
    {id: 244, category: "portfolio", image: "sune14.jpg", description: "선이", type: "short"},
    {id: 245, category: "portfolio", image: "sune15.jpg", description: "선이", type: "short"},
    {id: 246, category: "portfolio", image: "sune16.jpg", description: "선이", type: "short"},
    {id: 247, category: "portfolio", image: "sune17.jpg", description: "선이", type: "short"},
    {id: 248, category: "portfolio", image: "sune18.jpg", description: "선이", type: "short"},
    {id: 249, category: "portfolio", image: "sune19.jpg", description: "선이", type: "short"},
    ...generateGMSeries(),
    // 영의 확률
    {id: 530, category: "portfolio", image: "percent_709/percent_1.jpg", description: "영의 확률", type: "short"},
    {id: 531, category: "portfolio", image: "percent_709/percent_2.jpg", description: "영의 확률", type: "short"},
    {id: 532, category: "portfolio", image: "percent_709/percent_3.jpg", description: "영의 확률", type: "short"},
    {id: 533, category: "portfolio", image: "percent_709/percent_4.jpg", description: "영의 확률", type: "short"},
    {id: 534, category: "portfolio", image: "percent_709/percent_5.jpg", description: "영의 확률", type: "short"},
    {id: 535, category: "portfolio", image: "percent_709/percent_6.jpg", description: "영의 확률", type: "short"},
    {id: 536, category: "portfolio", image: "percent_709/percent_7.jpg", description: "영의 확률", type: "short"},
    {id: 537, category: "portfolio", image: "percent_709/percent_8.jpg", description: "영의 확률", type: "short"},
    {id: 538, category: "portfolio", image: "percent_709/percent_9.jpg", description: "영의 확률", type: "short"},
    {id: 539, category: "portfolio", image: "percent_709/percent_10.jpg", description: "영의 확률", type: "short"},
    {id: 540, category: "portfolio", image: "percent_709/percent_11.jpg", description: "영의 확률", type: "short"},
    {id: 541, category: "portfolio", image: "percent_709/percent_12.jpg", description: "영의 확률", type: "short"},
    {id: 542, category: "portfolio", image: "percent_709/percent_13.jpg", description: "영의 확률", type: "short"},
    {id: 543, category: "portfolio", image: "percent_709/percent_14.jpg", description: "영의 확률", type: "short"},
    {id: 544, category: "portfolio", image: "percent_709/percent_15.jpg", description: "영의 확률", type: "short"},
    {id: 545, category: "portfolio", image: "percent_709/percent_16.jpg", description: "영의 확률", type: "short"},
    {id: 546, category: "portfolio", image: "percent_709/percent_17.jpg", description: "영의 확률", type: "short"},
    {id: 547, category: "portfolio", image: "percent_709/percent_18.jpg", description: "영의 확률", type: "short"},
    {id: 548, category: "portfolio", image: "percent_709/percent_19.jpg", description: "영의 확률", type: "short"},
    // 환영
    {id: 142, category: "portfolio", image: "after2.jpg", description: "환영", type: "short"},
    {id: 143, category: "portfolio", image: "after23.jpg", description: "환영", type: "short"},
    {id: 144, category: "portfolio", image: "HW_250915_OK_00_00_06_20.jpg", description: "환영", type: "short"},
    {id: 145, category: "portfolio", image: "HW_250915_OK_00_02_36_17.jpg", description: "환영", type: "short"},
    // 환영
    {id: 150, category: "portfolio", image: "16mm_1.jpg", description: "환영", type: "short"},
    {id: 151, category: "portfolio", image: "16mm_2.jpg", description: "환영", type: "short"},
    {id: 152, category: "portfolio", image: "16mm_3.jpg", description: "환영", type: "short"},
    {id: 153, category: "portfolio", image: "16mm_4.jpg", description: "환영", type: "short"},
    {id: 154, category: "portfolio", image: "16mm_5.jpg", description: "환영", type: "short"},
    // Ronin 4D
    {id: 155, category: "portfolio", image: "after7.jpg", description: "Ronin 4D", type: "short"},
    {id: 156, category: "portfolio", image: "after9.jpg", description: "Ronin 4D", type: "short"},
    // Arri 65
    {id: 157, category: "portfolio", image: "after8.jpg", description: "Arri 65", type: "short"},
    {id: 158, category: "portfolio", image: "after10.jpg", description: "Arri 65", type: "short"},
    // 그릇된 소녀
    {id: 159, category: "portfolio", image: "after11.jpg", description: "그릇된 소녀", type: "feature"},
    {id: 160, category: "portfolio", image: "after12.jpg", description: "그릇된 소녀", type: "feature"},
    {id: 161, category: "portfolio", image: "after13.jpg", description: "그릇된 소녀", type: "feature"},
    {id: 162, category: "portfolio", image: "after14.jpg", description: "그릇된 소녀", type: "feature"},
    {id: 163, category: "portfolio", image: "after15.jpg", description: "그릇된 소녀", type: "feature"},
    // 로망스
    {id: 164, category: "portfolio", image: "after16.jpg", description: "로망스", type: "feature"},
    {id: 165, category: "portfolio", image: "after17.jpg", description: "로망스", type: "feature"},
    {id: 166, category: "portfolio", image: "after18.jpg", description: "로망스", type: "feature"},
    // 가문의영광
    {id: 167, category: "portfolio", image: "after19.jpg", description: "가문의영광", type: "feature"},
    {id: 168, category: "portfolio", image: "after20.jpg", description: "가문의영광", type: "feature"},
    {id: 169, category: "portfolio", image: "after21.jpg", description: "가문의영광", type: "feature"},
    {id: 170, category: "portfolio", image: "after22.jpg", description: "가문의영광", type: "feature"},
    // 비밀일수밖에
    {id: 187, category: "portfolio", image: "secert_1.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 188, category: "portfolio", image: "secert_2.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 189, category: "portfolio", image: "secert_3.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 190, category: "portfolio", image: "secert_4.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 191, category: "portfolio", image: "secert_5.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 192, category: "portfolio", image: "secert_6.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 193, category: "portfolio", image: "secert_7.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 194, category: "portfolio", image: "secert_8.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 195, category: "portfolio", image: "secert_9.jpg", description: "비밀일수밖에", type: "feature"},
    {id: 196, category: "portfolio", image: "secert_10.jpg", description: "비밀일수밖에", type: "feature"},
    // 우리동네영화광
    {id: 197, category: "portfolio", image: "KU_1.jpg", description: "우리동네영화광", type: "feature"},
    {id: 198, category: "portfolio", image: "KU_2.jpg", description: "우리동네영화광", type: "feature"},
    {id: 199, category: "portfolio", image: "KU_3.jpg", description: "우리동네영화광", type: "feature"},
    {id: 200, category: "portfolio", image: "KU_4.jpg", description: "우리동네영화광", type: "feature"},
    {id: 201, category: "portfolio", image: "KU_5.jpg", description: "우리동네영화광", type: "feature"},
    {id: 202, category: "portfolio", image: "KU_6.jpg", description: "우리동네영화광", type: "feature"},
    {id: 203, category: "portfolio", image: "KU_7.jpg", description: "우리동네영화광", type: "feature"},
    {id: 204, category: "portfolio", image: "KU_8.jpg", description: "우리동네영화광", type: "feature"},
    {id: 205, category: "portfolio", image: "KU_9.jpg", description: "우리동네영화광", type: "feature"},
    {id: 206, category: "portfolio", image: "KU_10.jpg", description: "우리동네영화광", type: "feature"},
    {id: 207, category: "portfolio", image: "KU_11.jpg", description: "우리동네영화광", type: "feature"},
    {id: 208, category: "portfolio", image: "KU_12.jpg", description: "우리동네영화광", type: "feature"},
    // 시그널 (서울시 자살예방)
    {id: 209, category: "portfolio", image: "prob_1.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 210, category: "portfolio", image: "prob_2.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 211, category: "portfolio", image: "prob_3.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 212, category: "portfolio", image: "prob_4.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 213, category: "portfolio", image: "prob_5.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 214, category: "portfolio", image: "prob_6.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 215, category: "portfolio", image: "prob_7.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 216, category: "portfolio", image: "prob_8.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 217, category: "portfolio", image: "prob_9.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 218, category: "portfolio", image: "prob_10.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    {id: 219, category: "portfolio", image: "prob_11.jpg", description: "서울시자살예방캠페인 '시그널'", type: "commercial"},
    // BlackSnake
    {id: 173, category: "portfolio", image: "BS3.jpg", description: "BlackSnake", type: "feature"},
    {id: 174, category: "portfolio", image: "BS4.jpg", description: "BlackSnake", type: "feature"},
    {id: 175, category: "portfolio", image: "BS5.jpg", description: "BlackSnake", type: "feature"},
    {id: 176, category: "portfolio", image: "BS6.jpg", description: "BlackSnake", type: "feature"},
    {id: 177, category: "portfolio", image: "BS7.jpg", description: "BlackSnake", type: "feature"},
    {id: 178, category: "portfolio", image: "BS8.jpg", description: "BlackSnake", type: "feature"},
    {id: 179, category: "portfolio", image: "BS9.jpg", description: "BlackSnake", type: "feature"},
    {id: 180, category: "portfolio", image: "BS10.jpg", description: "BlackSnake", type: "feature"},
    {id: 181, category: "portfolio", image: "BS11.jpg", description: "BlackSnake", type: "feature"},
    {id: 182, category: "portfolio", image: "BS12.jpg", description: "BlackSnake", type: "feature"},
    {id: 183, category: "portfolio", image: "BS13.jpg", description: "BlackSnake", type: "feature"},
    {id: 184, category: "portfolio", image: "BS14.jpg", description: "BlackSnake", type: "feature"},
    {id: 185, category: "portfolio", image: "BS15.jpg", description: "BlackSnake", type: "feature"},
    // YouTube Video
    {id: 186, category: "portfolio", type: "video", videoUrl: "https://youtu.be/PfEMKreJVDo", embedUrl: "https://www.youtube.com/embed/PfEMKreJVDo", thumbnail: "https://img.youtube.com/vi/PfEMKreJVDo/maxresdefault.jpg", description: "착한사나이"},
    // Gardener 클라우디안 (M/V) - moved down 3 items
    {id: 220, category: "portfolio", image: "cloud_1.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 221, category: "portfolio", image: "cloud_2.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 222, category: "portfolio", image: "cloud_3.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 223, category: "portfolio", image: "cloud_4.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 224, category: "portfolio", image: "cloud_5.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 225, category: "portfolio", image: "cloud_6.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 226, category: "portfolio", image: "cloud_7.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 227, category: "portfolio", image: "cloud_8.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 228, category: "portfolio", image: "cloud_9.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 229, category: "portfolio", image: "cloud_10.jpg", description: "Gardener 클라우디안", type: "mv"},
    {id: 230, category: "portfolio", image: "cloud_11.jpg", description: "Gardener 클라우디안", type: "mv"}
];

// Application state management (encapsulated to avoid global pollution)
const AppState = {
    loadedImages: 0,
    totalImages: worksData.filter(work => work.representativeImage).length,
    currentFilter: 'all',
    currentModalIndex: 0,
    currentModalItems: [],
    currentSection: 'home',
    currentWorkPage: 0,
    currentWorkImages: [],
    touchStartX: 0,
    touchEndX: 0
};

function hideLoadingScreen() {
    try {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => { loadingScreen.style.display = 'none'; }, 800);
            }
        }, 1000);
    } catch (error) {
        logger.error('Error in hideLoadingScreen:', error);
    }
}

function checkAllImagesLoaded() {
    try {
        AppState.loadedImages++;
        if (AppState.loadedImages >= AppState.totalImages) hideLoadingScreen();
    } catch (error) {
        logger.error('Error in checkAllImagesLoaded:', error);
    }
}

function renderGallery(items) {
    try {
        const gallery = document.getElementById('gallery');
        if (!gallery) {
            logger.error('Gallery element not found');
            return;
        }

        gallery.innerHTML = '';

        // Get projects with representative images based on current filter
        let filteredProjects = [];

        if (AppState.currentFilter === 'all') {
            filteredProjects = worksData.filter(work => work.representativeImage);
        } else if (AppState.currentFilter === 'drama') {
            filteredProjects = worksData.filter(work => work.type === 'drama' && work.representativeImage);
        } else if (AppState.currentFilter === 'commercial') {
            filteredProjects = worksData.filter(work => work.type === 'commercial' && work.representativeImage);
        } else if (AppState.currentFilter === 'mv') {
            filteredProjects = worksData.filter(work => work.type === 'mv' && work.representativeImage);
        } else if (AppState.currentFilter === 'short') {
            filteredProjects = worksData.filter(work => work.type === 'short' && work.representativeImage);
        } else if (AppState.currentFilter === 'feature') {
            filteredProjects = worksData.filter(work => work.type === 'feature' && work.representativeImage);
        } else if (AppState.currentFilter === 'random') {
            filteredProjects = [...worksData.filter(work => work.representativeImage)].sort(() => Math.random() - 0.5);
        }

        logger.log('Rendering gallery with', filteredProjects.length, 'projects, filter:', AppState.currentFilter);

        // Create 2-column grid layout
        for (let i = 0; i < filteredProjects.length; i += 2) {
            const galleryRow = document.createElement('div');
            galleryRow.className = 'gallery-row';

            if (filteredProjects[i]) {
                galleryRow.appendChild(createProjectGalleryItem(filteredProjects[i], i));
            }
            if (filteredProjects[i + 1]) {
                galleryRow.appendChild(createProjectGalleryItem(filteredProjects[i + 1], i + 1));
            }

            gallery.appendChild(galleryRow);
        }
    } catch (error) {
        logger.error('Error in renderGallery:', error);
    }
}

function createProjectGalleryItem(project, index) {
    try {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item loading';
        galleryItem.style.animationDelay = `${index * 0.1}s`;

        const imageSrc = project.representativeImage;
        const categoryText = project.category || project.type;
        const titleText = project.artist ? `${project.title} - ${project.artist}` : project.title;
        const hasYoutubeLink = project.youtubeUrl;

        // YouTube icon for projects with youtube links
        const youtubeIcon = hasYoutubeLink ? `
            <div class="youtube-link-indicator">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
            </div>
        ` : '';

        galleryItem.innerHTML = `
            <img src="${imageSrc}" alt="${titleText} by Feeldiz DI Studio">
            ${youtubeIcon}
            <div class="gallery-item-overlay">
                <p class="overlay-category">${categoryText}</p>
                <p class="overlay-description">${titleText}</p>
            </div>
        `;

        const img = galleryItem.querySelector('img');

        // Enhanced error handling with fallback placeholder
        img.onload = () => {
            try {
                galleryItem.classList.remove('loading');
                checkAllImagesLoaded();
            } catch (error) {
                logger.error('Error handling image load:', error);
            }
        };

        img.onerror = () => {
            try {
                logger.warn('Failed to load image:', imageSrc);
                img.src = FALLBACK_IMAGE;
                galleryItem.classList.remove('loading');
                checkAllImagesLoaded();
            } catch (error) {
                logger.error('Error handling image error:', error);
                galleryItem.classList.remove('loading');
                checkAllImagesLoaded();
            }
        };

        // Add click handler - open YouTube for youtube projects, otherwise show detail page
        galleryItem.addEventListener('click', () => {
            if (hasYoutubeLink) {
                window.open(project.youtubeUrl, '_blank');
            } else {
                showProjectDetailPage(project);
            }
        });

        return galleryItem;
    } catch (error) {
        logger.error('Error in createProjectGalleryItem:', error);
        return document.createElement('div');
    }
}

function createGalleryItem(item, index) {
    try {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item loading';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        const isVideo = item.type === 'video';
        const imageSrc = isVideo ? item.thumbnail : item.image;
        const playIcon = isVideo ? '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:3;color:white;font-size:3rem;opacity:0.8;">▶</div>' : '';
        galleryItem.innerHTML = `<img src="${imageSrc}" alt="${item.description} - ${item.category} by Feeldiz DI Studio" data-id="${item.id}">${playIcon}<div class="gallery-item-overlay"><p class="overlay-category">${item.category}</p><p class="overlay-description">${item.description}</p></div>`;
        const img = galleryItem.querySelector('img');

        // Enhanced error handling with fallback placeholder
        img.onload = () => {
            try {
                galleryItem.classList.remove('loading');
                checkAllImagesLoaded();
            } catch (error) {
                logger.error('Error handling image load:', error);
            }
        };

        img.onerror = () => {
            try {
                logger.warn('Failed to load image:', imageSrc);
                img.src = FALLBACK_IMAGE;
                galleryItem.classList.remove('loading');
                checkAllImagesLoaded();
            } catch (error) {
                logger.error('Error handling image error:', error);
                galleryItem.classList.remove('loading');
                checkAllImagesLoaded();
            }
        };

        return galleryItem;
    } catch (error) {
        logger.error('Error in createGalleryItem:', error);
        return document.createElement('div');
    }
}

function showDiceAnimation() {
    try {
        const diceOverlay = document.getElementById('diceOverlay');
        if (!diceOverlay) {
            logger.error('diceOverlay element not found');
            renderGallery(portfolioData);
            return;
        }

        diceOverlay.classList.add('show');
        setTimeout(() => {
            try {
                diceOverlay.classList.remove('show');
                renderGallery(portfolioData);
            } catch (error) {
                logger.error('Error in showDiceAnimation timeout:', error);
            }
        }, 1500);
    } catch (error) {
        logger.error('Error in showDiceAnimation:', error);
    }
}

function showSection(sectionName, skipHistory = false) {
    try {
        const homeHeader = document.querySelector('#home');
        const filterSection = document.querySelector('.filter-section');
        const galleryContainer = document.querySelector('.container');
        const aboutSection = document.getElementById('about');
        const worksSection = document.getElementById('works');
        const facilitySection = document.getElementById('facility');
        const contactSection = document.getElementById('contact');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Update URL without page reload (skip if triggered by popstate)
        const path = sectionName === 'home' ? '/feeldiz_di/' : `/feeldiz_di/${sectionName}`;

        if (!skipHistory) {
            try {
                window.history.pushState({section: sectionName}, '', path);
            } catch (e) {
                logger.log('History API not available in this context');
            }
        }

        // Send pageview to Google Analytics
        if (typeof gtag !== 'undefined') {
            try {
                gtag('config', 'G-CQ7WEVF0CB', {
                    'page_path': path,
                    'page_title': sectionName.charAt(0).toUpperCase() + sectionName.slice(1)
                });
            } catch (error) {
                logger.error('Error sending pageview to Google Analytics:', error);
            }
        }

        if (sectionName === 'home') {
            if (homeHeader) homeHeader.style.display = 'block';
            if (filterSection) filterSection.style.display = 'block';
            if (galleryContainer) galleryContainer.style.display = 'block';
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'flex';
            if (aboutSection) { aboutSection.style.display = 'none'; aboutSection.classList.remove('active'); }
            if (worksSection) { worksSection.style.display = 'none'; worksSection.classList.remove('active'); }
            if (facilitySection) { facilitySection.style.display = 'none'; facilitySection.classList.remove('active'); }
            if (contactSection) { contactSection.style.display = 'none'; contactSection.classList.remove('active'); }
        } else if (sectionName === 'works') {
            if (homeHeader) homeHeader.style.display = 'none';
            if (filterSection) filterSection.style.display = 'none';
            if (galleryContainer) galleryContainer.style.display = 'none';
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
            if (aboutSection) { aboutSection.style.display = 'none'; aboutSection.classList.remove('active'); }
            if (facilitySection) { facilitySection.style.display = 'none'; facilitySection.classList.remove('active'); }
            if (contactSection) { contactSection.style.display = 'none'; contactSection.classList.remove('active'); }
            if (worksSection) { worksSection.style.display = 'block'; worksSection.classList.add('active'); renderWorks('film'); }
        } else if (sectionName === 'facility') {
            if (homeHeader) homeHeader.style.display = 'none';
            if (filterSection) filterSection.style.display = 'none';
            if (galleryContainer) galleryContainer.style.display = 'none';
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
            if (aboutSection) { aboutSection.style.display = 'none'; aboutSection.classList.remove('active'); }
            if (worksSection) { worksSection.style.display = 'none'; worksSection.classList.remove('active'); }
            if (contactSection) { contactSection.style.display = 'none'; contactSection.classList.remove('active'); }
            if (facilitySection) { facilitySection.style.display = 'block'; facilitySection.classList.add('active'); }
        } else if (sectionName === 'about') {
            if (homeHeader) homeHeader.style.display = 'none';
            if (filterSection) filterSection.style.display = 'none';
            if (galleryContainer) galleryContainer.style.display = 'none';
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
            if (worksSection) { worksSection.style.display = 'none'; worksSection.classList.remove('active'); }
            if (facilitySection) { facilitySection.style.display = 'none'; facilitySection.classList.remove('active'); }
            if (contactSection) { contactSection.style.display = 'none'; contactSection.classList.remove('active'); }
            if (aboutSection) { aboutSection.style.display = 'block'; aboutSection.classList.add('active'); }
        } else if (sectionName === 'contact') {
            if (homeHeader) homeHeader.style.display = 'none';
            if (filterSection) filterSection.style.display = 'none';
            if (galleryContainer) galleryContainer.style.display = 'none';
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
            if (aboutSection) { aboutSection.style.display = 'none'; aboutSection.classList.remove('active'); }
            if (worksSection) { worksSection.style.display = 'none'; worksSection.classList.remove('active'); }
            if (facilitySection) { facilitySection.style.display = 'none'; facilitySection.classList.remove('active'); }
            if (contactSection) { contactSection.style.display = 'block'; contactSection.classList.add('active'); }
        }
        AppState.currentSection = sectionName;
    } catch (error) {
        logger.error('Error in showSection:', error);
    }
}

function openModal(item) {
    try {
        // All Works: ID 역순 정렬 (갤러리 표시 순서와 동일)
        if (AppState.currentFilter === 'all') {
            AppState.currentModalItems = [...portfolioData].sort((a, b) => b.id - a.id);
        } else {
            AppState.currentModalItems = AppState.currentFilter === 'drama' ? portfolioData.filter(item => item.description === "착한사나이") :
                               AppState.currentFilter === 'commercial' ? portfolioData.filter(item => item.type === "commercial") :
                               AppState.currentFilter === 'mv' ? portfolioData.filter(item => item.type === "mv") :
                               AppState.currentFilter === 'short' ? portfolioData.filter(item => item.type === "short") :
                               AppState.currentFilter === 'feature' ? portfolioData.filter(item => item.type === "feature") :
                               portfolioData;
        }
        AppState.currentModalIndex = AppState.currentModalItems.findIndex(modalItem => modalItem.id === item.id);
        showModalContent(item);
        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            imageModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        logger.error('Error in openModal:', error);
    }
}

function showModalContent(item) {
    try {
        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');

        if (!modalImage || !modalVideo) {
            logger.error('Modal image or video element not found');
            return;
        }

        if (item.type === 'video') {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = item.embedUrl;
        } else {
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = item.image;
            modalImage.alt = `${item.description} - ${item.type} 작품, Feeldiz DI Studio 포트폴리오`;
            modalImage.onerror = () => {
                logger.warn('Failed to load modal image:', item.image);
                modalImage.src = FALLBACK_IMAGE;
            };
        }
    } catch (error) {
        logger.error('Error in showModalContent:', error);
    }
}

function showNextImage() {
    try {
        if (AppState.currentModalItems.length <= 1) return;
        AppState.currentModalIndex = (AppState.currentModalIndex + 1) % AppState.currentModalItems.length;
        showModalContent(AppState.currentModalItems[AppState.currentModalIndex]);
    } catch (error) {
        logger.error('Error in showNextImage:', error);
    }
}

function showPreviousImage() {
    try {
        if (AppState.currentModalItems.length <= 1) return;
        AppState.currentModalIndex = AppState.currentModalIndex === 0 ? AppState.currentModalItems.length - 1 : AppState.currentModalIndex - 1;
        showModalContent(AppState.currentModalItems[AppState.currentModalIndex]);
    } catch (error) {
        logger.error('Error in showPreviousImage:', error);
    }
}

function closeModal() {
    try {
        const imageModal = document.getElementById('imageModal');
        const modalVideo = document.getElementById('modalVideo');

        if (imageModal) imageModal.style.display = 'none';
        if (modalVideo) modalVideo.src = '';
        document.body.style.overflow = 'auto';
    } catch (error) {
        logger.error('Error in closeModal:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        renderGallery(portfolioData);

        // Set initial history state (wrapped in try-catch for compatibility)
        try {
            window.history.replaceState({section: 'home'}, '', '/feeldiz_di/');
        } catch (e) {
            logger.log('History API not available in this context');
        }

        // Check URL on page load and show correct section
        try {
            // Check for redirect parameter from 404.html
            const urlParams = new URLSearchParams(window.location.search);
            const redirectSection = urlParams.get('redirect');

            let section = 'home';

            if (redirectSection && ['works'].includes(redirectSection)) {
                section = redirectSection;
                // Clean up URL by removing redirect parameter
                window.history.replaceState({section: section}, '', `/feeldiz_di/${section}`);
            } else {
                const path = window.location.pathname;
                const pathSection = path.split('/').pop();
                if (['works'].includes(pathSection)) {
                    section = pathSection;
                }
            }

            if (section !== 'home') {
                showSection(section, true); // Skip history on initial load
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === section) {
                        link.classList.add('active');
                    }
                });
            } else {
                showSection('home', true); // Skip history on initial load
            }

            // Handle browser back/forward buttons
            window.addEventListener('popstate', (event) => {
                try {
                    const section = event.state && event.state.section ? event.state.section : 'home';
                    showSection(section, true); // Skip history update since URL is already changed

                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.section === section) {
                            link.classList.add('active');
                        }
                    });
                } catch (error) {
                    logger.error('Error handling popstate:', error);
                }
            });

            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    try {
                        e.preventDefault();
                        const section = link.dataset.section;
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        showSection(section);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } catch (error) {
                        logger.error('Error handling nav link click:', error);
                    }
                });
            });

            document.querySelectorAll('.works-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    try {
                        document.querySelectorAll('.works-tab').forEach(t => t.classList.remove('active'));
                        e.target.classList.add('active');
                        const filter = e.target.dataset.worksFilter;

                        // Show/hide film subcategory tabs
                        const filmSubcategoryTabs = document.getElementById('filmSubcategoryTabs');
                        if (filmSubcategoryTabs) {
                            if (filter === 'film') {
                                filmSubcategoryTabs.style.display = 'flex';
                                // Reset subcategory to 'all' when switching to film
                                document.querySelectorAll('.film-subcategory-tab').forEach(t => t.classList.remove('active'));
                                document.querySelector('.film-subcategory-tab[data-film-subcategory="all"]').classList.add('active');
                            } else {
                                filmSubcategoryTabs.style.display = 'none';
                            }
                        }

                        renderWorks(filter);
                    } catch (error) {
                        logger.error('Error handling works tab click:', error);
                    }
                });
            });

            // Film subcategory tabs event handler
            document.querySelectorAll('.film-subcategory-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    try {
                        document.querySelectorAll('.film-subcategory-tab').forEach(t => t.classList.remove('active'));
                        e.target.classList.add('active');
                        const subcategory = e.target.dataset.filmSubcategory;
                        renderWorks('film', subcategory);
                    } catch (error) {
                        logger.error('Error handling film subcategory tab click:', error);
                    }
                });
            });

            // Work images modal event handlers
            const workImagesClose = document.getElementById('workImagesClose');
            const workImagesPrev = document.getElementById('workImagesPrev');
            const workImagesNext = document.getElementById('workImagesNext');
            const workImagesModal = document.getElementById('workImagesModal');

            if (workImagesClose) {
                workImagesClose.addEventListener('click', closeWorkImages);
            }

            if (workImagesPrev) {
                workImagesPrev.addEventListener('click', () => {
                    if (AppState.currentWorkPage > 0) {
                        AppState.currentWorkPage--;
                        renderWorkImagesPage();
                    }
                });
            }

            if (workImagesNext) {
                workImagesNext.addEventListener('click', () => {
                    const totalPages = Math.ceil(AppState.currentWorkImages.length / 9);
                    if (AppState.currentWorkPage < totalPages - 1) {
                        AppState.currentWorkPage++;
                        renderWorkImagesPage();
                    }
                });
            }

            // Close modal when clicking outside
            if (workImagesModal) {
                workImagesModal.addEventListener('click', (e) => {
                    if (e.target === workImagesModal) {
                        closeWorkImages();
                    }
                });
            }

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    try {
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        AppState.currentFilter = e.target.dataset.filter;
                        if (AppState.currentFilter === 'random') {
                            showDiceAnimation();
                        } else {
                            renderGallery(portfolioData);
                        }
                    } catch (error) {
                        logger.error('Error handling filter button click:', error);
                    }
                });
            });

            document.addEventListener('click', (e) => {
                try {
                    if (e.target.tagName === 'IMG' && e.target.dataset.id) {
                        const item = portfolioData.find(p => p.id === parseInt(e.target.dataset.id));
                        if (item) openModal(item);
                    }
                } catch (error) {
                    logger.error('Error handling image click:', error);
                }
            });

            const modalCloseBtn = document.querySelector('.modal-close');
            const imageModal = document.getElementById('imageModal');
            if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
            if (imageModal) {
                imageModal.addEventListener('click', (e) => {
                    try {
                        if (e.target === imageModal) closeModal();
                    } catch (error) {
                        logger.error('Error handling modal click:', error);
                    }
                });
            }

            const modalPrev = document.getElementById('modalPrev');
            const modalNext = document.getElementById('modalNext');
            const scrollToTop = document.getElementById('scrollToTop');

            if (modalPrev) modalPrev.addEventListener('click', (e) => {
                try {
                    e.stopPropagation();
                    showPreviousImage();
                } catch (error) {
                    logger.error('Error handling modal prev click:', error);
                }
            });

            if (modalNext) modalNext.addEventListener('click', (e) => {
                try {
                    e.stopPropagation();
                    showNextImage();
                } catch (error) {
                    logger.error('Error handling modal next click:', error);
                }
            });

            if (scrollToTop) scrollToTop.addEventListener('click', () => {
                try {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (error) {
                    logger.error('Error handling scroll to top:', error);
                }
            });

            document.addEventListener('keydown', (e) => {
                try {
                    const modal = document.getElementById('imageModal');
                    if (modal && modal.style.display === 'block') {
                        if (e.key === 'Escape') closeModal();
                        if (e.key === 'ArrowLeft') { e.preventDefault(); showPreviousImage(); }
                        if (e.key === 'ArrowRight') { e.preventDefault(); showNextImage(); }
                    }
                } catch (error) {
                    logger.error('Error handling keydown:', error);
                }
            });

            // Email JS initialization and form handling
            // SECURITY NOTE: EmailJS public key is exposed in client-side code
            // Implement rate limiting and domain whitelist in EmailJS dashboard
            // Consider using serverless function to hide API keys in production
            try {
                if (typeof emailjs !== 'undefined') {
                    emailjs.init("LQ4ZMYydDYnVxc1mh");
                    const contactForm = document.getElementById('contactForm');
                    const submitBtn = document.getElementById('submitBtn');
                    const formStatus = document.getElementById('formStatus');

                    if (contactForm) {
                        contactForm.addEventListener('submit', function(e) {
                            try {
                                e.preventDefault();
                                if (!submitBtn || !formStatus) {
                                    logger.error('Form elements not found');
                                    return;
                                }

                                submitBtn.textContent = '전송 중...';
                                submitBtn.disabled = true;
                                formStatus.style.display = 'none';

                                emailjs.sendForm('service_s086xku', 'template_0b2efsk', this)
                                .then(function(response) {
                                    try {
                                        submitBtn.textContent = '문의 보내기';
                                        submitBtn.disabled = false;
                                        formStatus.style.display = 'block';
                                        formStatus.style.color = '#4CAF50';
                                        formStatus.innerHTML = '✅ 문의가 성공적으로 전송되었습니다!<br>빠른 시일 내에 답변드리겠습니다.';
                                        contactForm.reset();
                                        setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
                                    } catch (error) {
                                        logger.error('Error handling form success:', error);
                                    }
                                }, function(error) {
                                    try {
                                        logger.error('Email JS error:', error);
                                        submitBtn.textContent = '문의 보내기';
                                        submitBtn.disabled = false;
                                        formStatus.style.display = 'block';
                                        formStatus.style.color = '#f44336';
                                        formStatus.innerHTML = '❌ 전송 중 오류가 발생했습니다.<br>직접 이메일로 연락해주세요: feeldiz.studio.di@gmail.com';
                                    } catch (error) {
                                        logger.error('Error handling form error:', error);
                                    }
                                });
                            } catch (error) {
                                logger.error('Error handling form submission:', error);
                            }
                        });
                    }
                } else {
                    logger.warn('EmailJS library not loaded');
                }
            } catch (error) {
                logger.error('Error initializing Email JS:', error);
            }

            setTimeout(() => {
                try {
                    if (AppState.loadedImages < AppState.totalImages) hideLoadingScreen();
                } catch (error) {
                    logger.error('Error in final timeout:', error);
                }
            }, 5000);
        } catch (error) {
            logger.error('Error in DOMContentLoaded event listener:', error);
        }
    } catch (error) {
        logger.error('Critical error in DOMContentLoaded:', error);
    }
});
