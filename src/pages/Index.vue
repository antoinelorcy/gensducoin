<template>
  <Layout>
    <Hero show-intro show-add-person />
    <TwoCols class="inner-width">
      <Filters
        :mobile-modal-visible="mobileFiltersModalVisible"
        :jobs="jobs"
        :regions="regions"
        :sorts="sorts"
        @close="mobileFiltersModalVisible = false"
        @reset="resetFilters"
        @sort="onSort"
        slot="left"
      />
      <template slot="right">
        <div class="display-flex">
          <Input v-model="search" placeholder="Rechercher par mots clés" icon="search" class="fluid-width flex-fluid" />
          <Button
            v-if="$store.state.isSmallWindow"
            icon="filter"
            fill="raw"
            class="m--l-2"
            @click="mobileFiltersModalVisible = true"
          />
        </div>
        <PeopleList v-if="people.length" :people="people" />
        <Empty v-else />
      </template>
    </TwoCols>
  </Layout>
</template>

<page-query>
query allPeople {
  people: allPeople {
    edges {
      node {
        id
        slug
        route
        name
        thumbnail 
        description
        adress
        city {
          id
          name
          postal_code
          region_id
        }
        region {
          id
          name
        }
        job {
          id
          title
        }
      }
    }
  }
}
</page-query>

<static-query>
query {
  jobs: allJobs (sortBy: "title", order: ASC) {
    edges {
      node {
        id
        title
      }
    }
  }

  regions: allRegions (sortBy: "name", order: ASC) {
    edges {
      node {
        id
        name
      }
    }
  }
}
</static-query>

<script>
import Hero from '~/components/Hero';
import PeopleList from '~/components/PeopleList';
import Filters from '~/components/Filters';
import Empty from '~/components/Empty';

export default {
    metaInfo: {
        title: 'Les gens du coin - gensducoin.fr'
    },

    components: {
        Hero,
        PeopleList,
        Filters,
        Empty
    },

    data () {
        return {
            mobileFiltersModalVisible: false,
            search: '',
            jobs: [],
            regions: [],
            sorts: []
        }
    },

    mounted () {
        this.jobs = this.$static.jobs.edges.map((e) => {
            return {
                ...e.node,
                checked: false
            }
        });

        this.regions = this.$static.regions.edges.map((e) => {
            return {
                ...e.node,
                checked: false
            }
        });

        this.sorts = [
            {
                id: 'nameAsc',
                label: 'Ordre alphabétique',
                checked: false
            },
            {
                id: 'newestFirst',
                label: 'Les plus récents',
                checked: true
            }
        ]
    },

    computed: {
        people () {
            return this.$page.people.edges.map((e) => e.node).filter((p) => {
                let r = true;

                if (this.checkedJobs.length && r) {
                    if (!p.job.id) return;
                    r = this.checkedJobs.includes(p.job.id);
                }

                if (this.checkedRegions.length && r) {
                    if (!p.region.id) return;
                    r = this.checkedRegions.includes(p.region.id);
                }

                if (this.search !== '' && r) {
                    r = p.name.toLowerCase().indexOf(this.search) > -1 || p.city.name.toLowerCase().indexOf(this.search) > -1;
                }

                return r;
            }).sort((a, b) => {
              if (this.currentSort === 'newestFirst') {
                return a.created_at - b.created_at;
              }
              return a.name.localeCompare(b.name);
            });
        },

        checkedJobs () {
            return this.jobs.filter((r) => r.checked).map((r) => r.id);
        },

        checkedRegions () {
            return this.regions.filter((r) => r.checked).map((r) => r.id);
        },

        currentSort () {
          const sort = this.sorts.find((s) => s.checked);
          return sort && sort.id;
        }
    },

    methods: {
        resetFilters () {
            this.jobs = this.jobs.map((r) => {
                return {
                ...r,
                checked: false
                }
            })

            this.regions = this.regions.map((r) => {
                return {
                ...r,
                checked: false
                }
            })

            this.sorts = this.sorts.map((o, index) => {
                return {
                ...o,
                checked: o.id === 'newestFirst'
                }
            })
        },

        onSort (sortId) {
            this.sorts = this.sorts.map((o) => {
                return {
                ...o,
                checked: o.id === sortId
                }
            });
        }
    }
}
</script>
