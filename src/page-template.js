const generateAbout = (aboutText) => {
	if (!aboutText) {
		return "";
	}

	return `
    <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
        <p>${aboutText}</p>
    </section>`;
};

const generateProjects = (projectsArr) => {
	// whoo, this one is gonna be weird :)

	// first, make an array of html blocks for featured projects
	// first, we destructure out the value of the feature property and return it
	// this works because .filter needs to return true or false, and feature is already a boolean property
	// then we can map
	const featuredHtmlArr = projectsArr
		.filter(({feature}) => feature)
		.map(({name, description, languages, link}) => {
			return `
        <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
                Built With: ${languages.join(", ")}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i> View Project on GitHub</a>
        </div>
        `;
		});

	// same goes for an array of non-featured projects
	// here, we invert the boolean value of feature, so this .filter will return items that originally had false :)
	const notFeaturedHtmlArr = projectsArr
		.filter(({feature}) => !feature)
		.map(({name, description, languages, link}) => {
			return `
        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
                Built With: ${languages.join(", ")}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i> View Project on GitHub</a>
        </div>
        `;
		});

	// array.map runs a function on every element of an array and makes a new array with the return values
	// here, we're taking each project, destructuring out the properties, and returning an html block with those properties interpolated
	// we can then feed that into the return below!
    // theoretically, we could insert those method chains directly into that return, because .map returns a value, but i don't want to

	return `
    <section class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
        <div class="flex-row justify-space-between">
            ${featuredHtmlArr.join("")}
            ${notFeaturedHtmlArr.join("")}
        </div>
    </section>
    `;
	// because we broke them into two arrays, we don't have to worry about sorting the list to get featured projects at the top! :)
};

const generatePage = (templateData) => {
	const {projects, about, ...header} = templateData;

	return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie-edge" />
        <title>Portfolio Demo</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <header>
            <div class="container flex-row justify-space-between align-center py-3">
                <h1 class="page-title text-secondary bg-dark py-2 px-3">${
					header.name
				}</h1>
                <nav class="flex-row">
                    <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
						header.github
					}">GitHub</a>
                </nav>
            </div>
        </header>

        <main class="container my-5">
            ${generateAbout(about)}
            ${generateProjects(projects)}
        </main>

        <footer class="container text-center py-3">
            <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${
		header.name
	}</h3>
        </footer>
    </body>
    </html>`;
};
// those line breaks will be present in the returned string!!!! :)

module.exports = generatePage;
