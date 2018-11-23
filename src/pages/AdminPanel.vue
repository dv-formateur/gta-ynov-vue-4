<template>
    <div class="container-fluid">
        <nav-bar></nav-bar>
        <b-card no-body bg-variant="light" class="">
            <b-tabs card>
                <b-tab title="Comptes" class="account-tab" active>
                    <div>
                        <p>Ajouter un utilisateur: </p>
                        <b-form inline class="form-group">
                            <b-input-group>
                                <b-input id="input-user-lname" v-model="user_form.lname" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Nom" />
                            </b-input-group>
                            <b-input-group>
                                <b-input id="input-user-fname" v-model="user_form.fname" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Prenom" />
                            </b-input-group>
                            <b-input-group>
                                <b-input id="input-user-email" type="email" v-model="user_form.email" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Adresse mail" />
                            </b-input-group>
                            <b-input-group>
                                <input type="checkbox" id="input-user-admin" name="input-user-admin" v-model="user_form.admin" class="mb-2 mr-sm-2 mb-sm-0"/>
                                <label for="input-user-admin">Administrateur</label>
                            </b-input-group>
                        </b-form>
                    <b-button v-b-popover.hover="'Creer l\'utilisateur'" @click="createUser()" variant="info">Valider</b-button>
                    </div>

                    <hr/>

                    <div class="form-group">
                        <input placeholder="Rechercher un utilisateur" class="form-control" type="text" v-model="search_user">
                    </div>

                    <table class="table table-responsive-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Roles</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="search_user === '' || user.fname.includes(search_user) || user.lname.includes(search_user) || user.email.includes(search_user)" v-for="user in users" :key="user.id"  @click="$router.push('/profile/' + user.id)">
                                <td><i v-b-popover.hover="'Administrateur'" v-if="user.app_role<=0" class="fas fa-chess-king text-info"></i></td>
                                <td>{{user.lname}}</td>
                                <td>{{user.fname}}</td>
                                <td>{{user.email}}</td>
                            </tr>
                        </tbody>
                    </table>
                </b-tab>
                <b-tab title="Projets" >
                    <div class="row">
                        <div class="col-md-3" id="admin-project-selector">
                            <div class="form-group">
                                <input placeholder="Rechercher un projet" class="form-control" type="text" v-model="search_project">
                            </div>
                            <b-list-group>
                                <b-list-group-item 
                                    button 
                                    class="d-flex justify-content-between align-items-center" 
                                    @click="selectProject(project)" 
                                    :active="selected_project && selected_project.id==project.id" 
                                    v-for="project in projects"
                                    v-if="search_project === '' || project.name.includes(search_project)"
                                    :key="project.id">

                                    {{project.name}}
                                    <b-badge variant="info" pill>{{project.project_users.length}}</b-badge>
                                </b-list-group-item>
                            </b-list-group>
                            <p class="text-center"><a v-b-popover.hover="'Creer un projet'" style="font-size: 24px;" @click="createProject()" class="fas fa-plus-circle btn text-success"></a></p>
                        </div>

                        <div class="col" v-if="selected_project">
                            <div class="form-group">
                                <b-btn variant="success" v-b-popover.hover="'Valider les changements'" @click="modifyProject(selected_project)">Valider</b-btn>
                                <b-btn variant="danger" v-b-popover.hover="'Supprimer le projet'" @click="removeProject(selected_project)">Supprimer</b-btn>
                            </div>

                            <hr>

                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Nom du projet" v-model="selected_project.name">
                            </div>
                            
                            <admin-project-user
                                v-for="user in selected_project.project_users" :key="user.user_id"
                                :project="selected_project" 
                                :project_user="user" 
                                class="row project-user-form-container" >
                            </admin-project-user>
                            <div>
                                <label for="add-user-to-project-selector">Ajouter un utlisateur: </label>
                                <select v-model="add_user_to_project_selector" class="form-control" name="add-user-to-project-selector">
                                    <option :value="null">--Selectionner un utilisateur--</option>
                                    <option selected v-for="user in users_not_in_project" :key="user.id" :value="user">{{user.fname}} {{user.lname}}</option>
                                </select>
                                <p class="text-center"><a style="font-size: 48px;" @click="addUserOnProject()" class="fas fa-plus-circle btn text-success"></a></p>
                            </div>

                            <hr>
                            <b-btn variant="success" v-b-popover.hover="'Valider les changements'" @click="modifyProject(selected_project)">Valider</b-btn>
                            <b-btn variant="danger" v-b-popover.hover="'Supprimer le projet'" @click="removeProject(selected_project)">Supprimer</b-btn>
                        </div>
                       
                    </div>
                </b-tab>
                <b-tab title="Contrats" >
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
    
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import AdminProjectUser from '../components/ComponentAdminProjectUser.vue'

import User from '../entities/user'
import Project from '../entities/project'
import UserService from '../services/user.service'
import ProjectService from '../services/project.service';
export default {
    components:{
        NavBar, AdminProjectUser
    },
    data(){
        return{
            users: [],
            search_user: '',
            add_user_to_project_selector: null,
            users_not_in_project: [],
            user_form:{
                lname: '',
                fname: '',
                email: '',
                admin: false
            },

            selected_project: null,
            search_project: '',
            projects: [],
            project_form:{

            }
        }
    },
    mounted(){
        UserService.getAll(this.setUsers);
        ProjectService.getAll(this.setProjects);
    },
    methods:{
        setUsers(users){
            this.users = users;
        },
        createUser(){
            var user = new User(null, this.user_form.lname, this.user_form.fname, this.user_form.email, this.user_form.admin? 0 : 1);
            UserService.create(this.onCreateUser, user) 
        },
        onCreateUser(user){
            UserService.getAll(this.setUsers);
        },

        setProjects(projects){
            this.projects = projects;
        },
        selectProject(project){
            this.selected_project = project;

            this.users_not_in_project = this.users.filter(user=>{
                return this.selected_project.project_users.filter(project_user=>{
                    return user.id === project_user.user_id;
                })==0;
            });
        },
        createProject(){
            var project = new Project(null, 'default-name');
            ProjectService.create(this.onCreateProject, project);
        },
        onCreateProject(project){
            ProjectService.getAll(this.setProjects);
            this.selected_project = project;
        },
        addUserOnProject(){
            if(this.selected_project.project_users){
                this.selected_project.project_users.push({
                    user_id: this.add_user_to_project_selector.id,
                    role: 2
                });
                this.selectProject(this.selected_project);
            }
            
        },
        modifyProject(project){
            ProjectService.modify(this.onModifyProject, project);
        },
        onModifyProject(project){
            ProjectService.getAll(this.setProjects);
            this.selected_project = project;
        },

        removeProject(project){
            ProjectService.remove(this.onRemoveProject, project);
        },
        onRemoveProject(){
            ProjectService.getAll(this.setProjects);
            this.selected_project = null;
        }
    }
    
}
</script>

<style>
    #admin-project-selector{
        margin-bottom: 20px;
    }

    .project-user-form-container{
        margin-bottom: 20px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 20px;
        background-color: white
    }
</style>
