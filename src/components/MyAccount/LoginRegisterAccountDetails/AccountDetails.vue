<template>
  <v-layout class="mt-3" row align-center justify-center>
    <v-flex xs11>
      <v-card>
        <v-card-text>
          <v-form ref="update" v-model="valid" lazy-validation>
            <v-text-field
              prepend-icon="person"
              name="First Name"
              label="First Name"
              type="text"
              :rules="firstNameRules"
              required
              v-model="firstName"
              :disabled="!canEdit"
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              name="Last Name"
              label="Last Name"
              type="text"
              :rules="lastNameRules"
              required
              v-model="lastName"
              :disabled="!canEdit"
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              name="Username"
              label="Username"
              type="text"
              :rules="usernameRules"
              required
              v-model="username"
              :disabled="!canEdit"
            ></v-text-field>
            <v-text-field
              id="currentPassword"
              prepend-icon="lock"
              name="Current Password"
              label="Current Password"
              type="password"
              :rules="passwordRules"
              required
              v-model="password"
              :disabled="!canEdit"
            ></v-text-field>
            <v-text-field
              id="newPassword"
              prepend-icon="lock"
              name="New Password"
              label="New Password"
              type="password"
              :rules="passwordRules"
              required
              v-model="newPassword"
              :disabled="!canEdit"
            ></v-text-field>
            <v-text-field
              id="confirmNewPassword"
              prepend-icon="lock"
              name="Confirm New Password"
              label="Confirm New Password"
              type="password"
              :rules="confirmNewPasswordRules"
              required
              v-model="confirmNewPassword"
              :disabled="!canEdit"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout class="mt-3" row align-center justify-center>
            <v-flex v-if="!canEdit" xs11>
              <v-btn
                block
                right
                color="#061122"
                @click="edit"
                dark
                class="mb-3"
                >Edit User Details</v-btn
              >
            </v-flex>
            <v-flex v-if="canEdit" xs11>
              <v-btn
                block
                right
                color="#061122"
                @click="update"
                dark
                class="mb-3"
                >Update</v-btn
              >
            </v-flex>
            <v-flex v-if="canEdit" xs11>
              <v-btn block right color="red darken-2" @click="cancel" dark
                >Cancel</v-btn
              >
            </v-flex>
            <v-flex v-if="!canEdit" xs11>
              <v-btn block right color="red darken-2" @click="logout" dark
                >Logout</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
    <logout-modal/>
  </v-layout>
</template>
<script>
import LogoutModal from './LogoutModal.vue'
export default {
  name: "AccountDetails",
  components:{LogoutModal},
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      firstNameRules: [(v) => !!v || "First Name is required"],
      lastNameRules: [(v) => !!v || "Last Name is required"],
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => v.length > 5 || "Username must be a minimum of 6 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password must be a minimum of 6 characters",
      ],
      confirmNewPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password must be a minimum of 6 characters",
        (v) => v === this.newPassword || "Passwords must match",
      ],
      canEdit: false,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters["user/userDetails"];
    },
  },
  created() {
    this.bindDetails();
  },
  methods: {
    logout() {
      this.$store.dispatch("user/updateShowLogoutModal", true);
    },
    bindDetails() {
      this.firstName = this.userDetails.firstName;
      this.lastName = this.userDetails.lastName;
      this.username = this.userDetails.username;
    },
    edit() {
      this.canEdit = true;
    },
    cancel() {
      this.canEdit = false;
      this.bindDetails();
    },
    update() {
      let self  = this
      if (this.$refs.update.validate()) {
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
          newPassword: this.newPassword,
        };
        this.$store.dispatch("user/updateUserDetails", {
          data: data,
          id: this.userDetails.id,
        }).then(() => {
            self.canEdit = false
            self.password = ''
            self.newPassword = ''
            self.confirmNewPassword = ''
          })
      }
    },
  },
};
</script>
<style></style>
