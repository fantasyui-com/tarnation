import shasum from 'shasum';
export default async function main({context, setup, input}) {

  const output = {
    profileList:[],
  };

  return new Promise( async (resolve, reject) => {

    let data = JSON.parse(input.jsonString);
    Object.keys(data.state.profiles).forEach(profileName=>{
      let profile = data.state.profiles[profileName];
      let cleanProfile = {
        title:profile.name_long,
        urls:[]
      };
      output.profileList.push(cleanProfile);
      profile.links.forEach(link=>{
        const url = new URL(link);
        cleanProfile.urls.push({
          cas: shasum(url.toString()),
          url:url.toString(),
          hostname: url.hostname,
          title: url.hostname // TODO REAL TITLES!
        })
      })
    });

    resolve(output);

  });

};
