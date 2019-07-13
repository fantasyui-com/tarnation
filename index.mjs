// Load Modules
import util from 'util';
import downloadHtml from './code_modules/download-html';
import resolveSrcAttributeUrl from './code_modules/resolve-src-attribute-url';
import extractInlineScripts from './code_modules/extract-inline-scripts';
import downloadRemoteScripts from './code_modules/download-remote-scripts';
import extractObjectExpressions from './code_modules/extract-object-expressions';
import convertObjectExpressionsToJson from './code_modules/convert-object-expressions-to-json';
import selectJson from './code_modules/select-json';
import pretifyObjectStructure from './code_modules/pretify-object-structure';
import prefetchAllWebpages from './code_modules/prefetch-all-webpages';
import fetchRealLinkTitles from './code_modules/fetch-real-link-titles';
import convertLinksToMarkdown from './code_modules/convert-links-to-markdown';
import saveData from './code_modules/save-data';

async function main(context={}){

  try {

    // 1. Download HTML:Loading the initial HTML Data. Each url will be analyzed for JavaScript information and sent down the pipe for decompiling and processing. Multiple website urls can specified. This operation should be cached as not to bother the webmasters.
    console.log('\nDownload HTML');
    const downloadHtmlResult = await downloadHtml({context,setup:{downloadCache:"2 hours",websiteList:["http://trackthis.link"]},input:{}});
    // console.log(util.inspect(downloadHtmlResult),false,2,true)

    // 2. Resolve src attribute URL:To keep things compact and clean, each of the downloaded HTML documents will have all their script src="" paths resolved. For example if a ```http://www.example.com``` document is referencing ```<script src="something.js">``` the tag will be converted to ```<script src="http://www.example.com/something.js">``` this eliminates keeping track of document metadata (such as its source).
    console.log('\nResolve src attribute URL');
    const resolveSrcAttributeUrlResult = await resolveSrcAttributeUrl({context,setup:{},input: downloadHtmlResult});
    // console.log(util.inspect(resolveSrcAttributeUrlResult),false,2,true)

    // 3. Extract Inline Scripts:The Extraction of Website's JavaScript
    console.log('\nExtract Inline Scripts');
    const extractInlineScriptsResult = await extractInlineScripts({context,setup:{},input: resolveSrcAttributeUrlResult});
    // console.log(util.inspect(extractInlineScriptsResult),false,2,true)

    // 4. Download Remote Scripts:Here we can skip filenames by Regular Expression matching.
    console.log('\nDownload Remote Scripts');
    const downloadRemoteScriptsResult = await downloadRemoteScripts({context,setup:{excludeList:[/modernizr.min.js$/,/detectizr.min.js$/]},input: extractInlineScriptsResult});
    // console.log(util.inspect(downloadRemoteScriptsResult),false,2,true)

    // 5. Extract Object Expressions:Converting JavaScript's ObjectExpressions(AST) to plain JSON ascii data.We target all ObjectExpressions found in all the extracted scripts.
    console.log('\nExtract Object Expressions');
    const extractObjectExpressionsResult = await extractObjectExpressions({context,setup:{},input: downloadRemoteScriptsResult});
    // console.log(util.inspect(extractObjectExpressionsResult),false,2,true)

    // 6. Convert Object Expressions to JSON:Now, we convert the AST representation of ObjectExpressions into plain old JSON.
    console.log('\nConvert Object Expressions to JSON');
    const convertObjectExpressionsToJsonResult = await convertObjectExpressionsToJson({context,setup:{},input: extractObjectExpressionsResult});
    // console.log(util.inspect(convertObjectExpressionsToJsonResult),false,2,true)

    // 7. Select JSON:Finding the object of interest. With a simple string search we identify the JSON of interest. The keywords used here are mentioned in the target website.
    console.log('\nSelect JSON');
    const selectJsonResult = await selectJson({context,setup:{stringList:["hypebeast","rich","doomsday","influencer"]},input: convertObjectExpressionsToJsonResult});
    // console.log(util.inspect(selectJsonResult),false,2,true)

    // 8. Pretify Object Structure:and do a little bit of cleaning and transformation.
    console.log('\nPretify Object Structure');
    const pretifyObjectStructureResult = await pretifyObjectStructure({context,setup:{},input: selectJsonResult});
    // console.log(util.inspect(pretifyObjectStructureResult),false,2,true)

    // 9. Prefetch All Webpages:Now we download all websites mentioned in the object of interest, and cache them for analysis as not to upset any webmasters.
    console.log('\nPrefetch All Webpages');
    const prefetchAllWebpagesResult = await prefetchAllWebpages({context,setup:{moduleCache:"8 hours",statusEnabled:true},input: pretifyObjectStructureResult});
    // console.log(util.inspect(prefetchAllWebpagesResult),false,2,true)

    // 10. Fetch Real Link Titles:Now, we extract titles from all the cached websites.
    console.log('\nFetch Real Link Titles');
    const fetchRealLinkTitlesResult = await fetchRealLinkTitles({context,setup:{},input: prefetchAllWebpagesResult});
    // console.log(util.inspect(fetchRealLinkTitlesResult),false,2,true)

    // 11. Convert Links to Markdown:Markdown Document Creation. Now that the object contains real titles and descriptions we proceed to create asimple markdown document that can be read over at github.
    console.log('\nConvert Links to Markdown');
    const convertLinksToMarkdownResult = await convertLinksToMarkdown({context,setup:{},input: fetchRealLinkTitlesResult});
    // console.log(util.inspect(convertLinksToMarkdownResult),false,2,true)

    // 12. Save Data:save it for everybody to see
    console.log('\nSave Data');
    const finalResult = await saveData({context,setup:{fileName:"TRACKTHIS.md"},input: convertLinksToMarkdownResult});
    // console.log(util.inspect(finalResult),false,2,true)

    // Return Result
    return finalResult;

  } catch(error) {

    console.error(error);

  } // end try/catch

} // end function main ()
main();