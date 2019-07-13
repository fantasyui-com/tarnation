# Tarnation
Extract and analyze embedded state objects in complex compiled applications.
---

## main
### Download HTML
Loading the initial HTML Data. Each url will be analyzed for JavaScript information and sent down the pipe for decompiling and processing. Multiple website urls can specified. This operation should be cached as not to bother the webmasters.
```JavaScript
{
  moduleName: "download-html",
  downloadCache: "2 hours",
  websiteList: ["http://trackthis.link"]
}
```
### Resolve src attribute URL
To keep things compact and clean, each of the downloaded HTML documents will have all their script src="" paths resolved. For example if a ```http://www.example.com``` document is referencing ```<script src="something.js">``` the tag will be converted to ```<script src="http://www.example.com/something.js">``` this eliminates keeping track of document metadata (such as its source).
```JavaScript
{
  moduleName: "resolve-src-attribute-url"
}
```
### Extract Inline Scripts
The Extraction of Website's JavaScript
```JavaScript
{
  moduleName: "extract-inline-scripts"
}
```
### Download Remote Scripts
Here we can skip filenames by Regular Expression matching.
```JavaScript
{
  moduleName: "download-remote-scripts",
  excludeList: [/modernizr.min.js$/, /detectizr.min.js$/]
}
```
### Extract Object Expressions
Converting JavaScript's ObjectExpressions(AST) to plain JSON ascii data.We target all ObjectExpressions found in all the extracted scripts.
```JavaScript
{
  moduleName: "extract-object-expressions"
}
```
### Convert Object Expressions to JSON
Now, we convert the AST representation of ObjectExpressions into plain old JSON.
```JavaScript
{
  moduleName: "convert-object-expressions-to-json"
}
```
### Select JSON
Finding the object of interest. With a simple string search we identify the JSON of interest. The keywords used here are mentioned in the target website.
```JavaScript
{
  moduleName: "select-json",
  stringList: ["hypebeast", "rich", "doomsday", "influencer"]
}
```
### Pretify Object Structure
and do a little bit of cleaning and transformation.
```JavaScript
{
  moduleName: "pretify-object-structure"
}
```
### Prefetch All Webpages
Now we download all websites mentioned in the object of interest, and cache them for analysis as not to upset any webmasters.
```JavaScript
{
  moduleName: "prefetch-all-webpages",
  moduleCache: "8 hours",
  statusEnabled: true
}
```
### Fetch Real Link Titles
Now, we extract titles from all the cached websites.
```JavaScript
{
  moduleName: "fetch-real-link-titles"
}
```
### Convert Links to Markdown
Markdown Document Creation. Now that the object contains real titles and descriptions we proceed to create asimple markdown document that can be read over at github.
```JavaScript
{
  moduleName: "convert-links-to-markdown"
}
```
### Save Data
save it for everybody to see
```JavaScript
{
  moduleName: "save-data",
  fileName: "TRACKTHIS.md"
}
```