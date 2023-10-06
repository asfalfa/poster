import { axios } from "axios";

const baseUrl = 'http://localhost:3030/'

const ProjectService = {
    getAllProjects: function() {
        axios.get(baseUrl + 'projects')
            .then(res => {
                return res
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    getProject: function(projectID) {
        axios.get(baseUrl + 'projects', {
            params: {
                ID: projectID,
            }
        })
        .then(res => {
            return res
        })
        .catch(function (error) {
            console.log(error);
        })
    },
};

export default ProjectService;