const program = {
  meta: {
    name: 'Tarnation',
    author: 'https://github.com/fantasyui-com',
    description: 'Extract and analyze embedded state objects in complex compiled applications.',
    keywords: ['scrape', 'analysis', 'trackthis.link']
  },
  data: [
    {
      meta: {
        name: 'main',
        description: 'Extract and analyze embedded state objects in complex compiled applications.',
        main: true,
      },
      data: [
        {
          name: 'Download HTML',
          description: 'Loading the initial HTML Data. Each url will be analyzed for JavaScript information and sent down the pipe for decompiling and processing. Multiple website urls can specified. This operation should be cached as not to bother the webmasters.',
          downloadCache: '2 hours',
          websiteList: ['http://trackthis.link']
        },

        {
          name: 'Resolve src attribute URL',
          description: 'To keep things compact and clean, each of the downloaded HTML documents will have all their script src="" paths resolved. For example if a ```http://www.example.com``` document is referencing ```<script src="something.js">``` the tag will be converted to ```<script src="http://www.example.com/something.js">``` this eliminates keeping track of document metadata (such as its source).',
        },

        {
          name: 'Extract Inline Scripts',
          description: "The Extraction of Website's JavaScript",
        },

        {
          name: 'Download Remote Scripts',
          description: 'Here we can skip filenames by Regular Expression matching.',
          excludeList: [
            /modernizr.min.js$/,
            /detectizr.min.js$/
          ]
        },

        {
          name: 'Extract Object Expressions',
          description: "Converting JavaScript's ObjectExpressions(AST) to plain JSON ascii data.We target all ObjectExpressions found in all the extracted scripts.",
        },

        {
          name: 'Convert Object Expressions to JSON',
          description: 'Now, we convert the AST representation of ObjectExpressions into plain old JSON.',
        },

        {
          name: 'Select JSON',
          description: 'Finding the object of interest. With a simple string search we identify the JSON of interest. The keywords used here are mentioned in the target website.',
          stringList: [ 'hypebeast', 'rich', 'doomsday', 'influencer' ]
        },

        {
          name: 'Pretify Object Structure',
          description: 'and do a little bit of cleaning and transformation.',
        },

        {
          name: 'Prefetch All Webpages',
          description: 'Now we download all websites mentioned in the object of interest, and cache them for analysis as not to upset any webmasters.',
          moduleCache: '8 hours',
          statusEnabled: true
        },

        {
          name: 'Fetch Real Link Titles',
          description: 'Now, we extract titles from all the cached websites.',
        },

        {
          name: 'Convert Links to Markdown',
          description: 'Markdown Document Creation. Now that the object contains real titles and descriptions we proceed to create asimple markdown document that can be read over at github.',
        },

        {
          name: 'Save Data',
          description: 'save it for everybody to see',
          fileName: 'TRACKTHIS.md'
        }
      ]
    },
  ]
};

module.exports = program;
