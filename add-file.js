import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function capitalizeFirstLetter(string) {
    if (string.length === 0) {
        return ""; // Handle empty string
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function (gulp) {
    gulp.task('add:s', async function () {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'sectionName',
                message: 'Enter section name:',
                validate: input => input ? true : 'Section name is required',
            },
        ]);

        const sectionName = answers.sectionName.trim();
        const baseDir = join(__dirname, 'src/html/sections');
        const htmlFile = join(baseDir, `_${sectionName}.html`);
        const scssDir = join(__dirname, 'src/assets/sass/sections');
        const scssFile = join(scssDir, `_${sectionName}.scss`);
        const scssIndex = join(__dirname, 'src/assets/sass/sections/_index.scss');

        if (!existsSync(baseDir)) {
            mkdirSync(baseDir, { recursive: true });
            console.log(`📁 Created folder: ${baseDir}`);
        }

        if (!existsSync(scssFile)) {
            writeFileSync(scssFile, `
                /* ======================  ${capitalizeFirstLetter(sectionName)} Section Start  ======================*/
                    .${sectionName}-section {}
                 /* ======================  ${capitalizeFirstLetter(sectionName)} Section End  ======================*/
            `);
            console.log(`🎨 Created SCSS: ${scssFile}`);
        }


        if (!existsSync(htmlFile)) {
            writeFileSync(htmlFile, `
                <!--==========================  ${capitalizeFirstLetter(sectionName)} Section Start  ==========================-->
                <section class="${sectionName}-section">
                    <div class="container">
                        <div class="row"></div>
                    </div>
                    </section>
                <!--==========================  ${capitalizeFirstLetter(sectionName)} Section End  ==========================-->
            `);
            console.log(`🧩 Created HTML: ${htmlFile}`);
        }

        const importLine = `\n @import '${sectionName}';\n`;
        const currentIndexContent = readFileSync(scssIndex, 'utf-8');

        if (!currentIndexContent.includes(importLine)) {
            appendFileSync(scssIndex, importLine);
            console.log(`📎 Updated SCSS _index.scss`);
        } else {
            console.log(`✅ SCSS import already exists`);
        }
    });
}
