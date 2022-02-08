// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
var faker = require('faker/locale/fr');
const axios = require('axios');
const fs = require('fs');
const apiEndPoint = 'http://gdc.antoinelorcy.com'; // 'http://localhost:1337/api';
const exportJsonPath = './static/json/';

module.exports = function (api) {
  api.loadSource(async actions => {
    // JOBS
    const jobs = { data } = await axios.get(apiEndPoint + '/jobs');
    const gJobsCollection = actions.addCollection({
      typeName: 'Jobs'
    })
    if (jobs.data && jobs.data.length) {
      for (const item of jobs.data) {
        gJobsCollection.addNode(item);
      }
      exportToJson('jobs.json', jobs.data);
    }

    // REGIONS
    const regions = { data } = await axios.get(apiEndPoint + '/regions');
    const gRegionsCollection = actions.addCollection({
      typeName: 'Regions'
    })
    if (regions.data && regions.data.length) {
      for (const item of regions.data) {
        gRegionsCollection.addNode(item);
      }
      exportToJson('regions.json', regions.data);
    }

    // CITIES
    const cities = { data } = await axios.get(apiEndPoint + '/cities');
    const gCitiesCollection = actions.addCollection({
      typeName: 'Cities'
    })
    if (cities.data && cities.data.length) {
      for (const item of cities.data) {
        gCitiesCollection.addNode(item);
      }
      exportToJson('cities.json', cities.data);
    }

    // PEOPLE
    const people = { data } = await axios.get(apiEndPoint + '/people');
    const gPeopleCollection = actions.addCollection({
      typeName: 'People'
    })
    if (people.data && people.data.length) {
      for (const item of people.data) {
        const slug = slugify(item.name);
        const slugJob = slugify(item.job.title);
        const slugCity = slugify(item.city.name);
        const person = {
          ...item,
          slug,
          route: `/p/${slug}-${slugJob}-${slugCity}/`,
          thumbnail: `http://gdc.antoinelorcy.com/uploads/thumbs/${item.thumbnail}`
        };
        console.log('person', person);
        gPeopleCollection.addNode(person);
      }
    }
  })

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`{
      allPeople {
        edges {
          node {
            id
            slug
            route
            name
            email
            thumbnail
            description
            adress
            city_id
            job_id
          }
        }
      }
    }`)

    data.allPeople.edges.forEach(({ node }) => {
      createPage({
        path: node.route,
        component: './src/templates/Person.vue',
        context: {
          id: node.id
        }
      })
    })

  })
}

function slugify(text) {
  return text
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

function exportToJson(filename, data) {
  fs.writeFileSync(exportJsonPath + filename, JSON.stringify(data));
}