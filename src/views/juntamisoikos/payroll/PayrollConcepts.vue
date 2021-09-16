<template>
  <div class="mt-4">
    <form>
      <h2 class="text-lg text-gray-700 font-semibold capitalize" align="center">
        Conceptos:
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 mx-6 my-6">
        <div>
          <label class="text-gray-700">Membresia actual:</label>
          <div>
            <a-input-number
              v-model="current_membership"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- --------------------------------------------- -->

        <div>
          <label class="text-gray-700">Cantidad de congregados:</label>
          <div>
            <a-input-number
              v-model="congregants_count"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------------ -->
        <div>
          <label class="text-gray-700">Cantidad de celulas:</label>
          <div>
            <a-input-number
              v-model="cells_count"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->

        <div>
          <label class="text-gray-700">Cantidad de misiones:</label>
          <div>
            <a-input-number
              v-model="missions_count"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Candidatos a bautizmo:</label>
          <div>
            <a-input-number
              v-model="baptism_candidates"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- --------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Bautizos:</label>
          <div>
            <a-input-number
              v-model="baptism"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- --------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Nuevos creyentes discipulados:</label>
          <div>
            <a-input-number
              v-model="new_believers_discipled"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Lideres entrenados:</label>
          <div>
            <a-input-number
              v-model="trained_leaders"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Celulas fundadas:</label>
          <div>
            <a-input-number
              v-model="founded_cells"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Misiones fundadas:</label>
          <div>
            <a-input-number
              v-model="founded_missions"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Iglesias fundadas:</label>
          <div>
            <a-input-number
              v-model="founded_churches"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Visitas Evangelisticas:</label>
          <div>
            <a-input-number
              v-model="evangelistic_visits"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Visitas de discipulado:</label>
          <div>
            <a-input-number
              v-model="discipleship_visits"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Visitas Edificacion:</label>
          <div>
            <a-input-number
              v-model="building_visits"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->

        <div>
          <label class="text-gray-700">Profesiones de fe:</label>
          <div>
            <a-input-number
              v-model="faith_professions"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Hermanos reconciliados:</label>
          <div>
            <a-input-number
              v-model="reconciled_brothers"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->
        <div>
          <label class="text-gray-700">Vidas ministradas:</label>
          <div>
            <a-input-number
              v-model="ministered_lives"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
        <!-- ------------------------------------------------- -->

        <div>
          <label class="text-gray-700">Cultos celebrados:</label>
          <div>
            <a-input-number
              v-model="cults_held"
              :min="0"
              :max="5000"
              :defaultValue="0"
              style="width: 250px"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from "vue";
import { InputNumber } from "ant-design-vue";
Vue.use(InputNumber);

// const $ = require("jquery");
// window.$ = $;

export default {
  data() {
    return {
      //atributos de conceptos
      current_membership: "0",
      congregants_count: "0",
      cells_count: "0",
      missions_count: "0",
      baptism_candidates: "0",
      baptism: "0",
      new_believers_discipled: "0",
      trained_leaders: "0",
      founded_cells: "0",
      founded_missions: "0",
      founded_churches: "0",
      evangelistic_visits: "0",
      discipleship_visits: "0",
      building_visits: "0",
      faith_professions: "0",
      reconciled_brothers: "0",
      ministered_lives: "0",
      cults_held: "0",

      //numeric text edit plugin
      max: 200,
      min: 0,
      step: 1,
      value: "0",
      decimals: "0",
    };
  },

  mounted() {
    //UPDATE
    if (this.current_membership_p !== undefined) {
      this.current_membership = this.current_membership_p;
    }

    if (this.congregants_count_p !== undefined) {
      this.congregants_count = this.congregants_count_p;
    }
    if (this.cells_count_p !== undefined) {
      this.cells_count = this.cells_count_p;
    }
    if (this.missions_count_p !== undefined) {
      this.missions_count = this.missions_count_p;
    }
    if (this.baptism_candidates_p !== undefined) {
      this.baptism_candidates = this.baptism_candidates_p;
    }
    if (this.baptism_p !== undefined) {
      this.baptism = this.baptism_p;
    }
    if (this.new_believers_discipled_p !== undefined) {
      this.new_believers_discipled = this.new_believers_discipled_p;
    }
    if (this.trained_leaders_p !== undefined) {
      this.trained_leaders = this.trained_leaders_p;
    }
    if (this.founded_cells_p !== undefined) {
      this.founded_cells = this.founded_cells_p;
    }
    if (this.founded_missions_p !== undefined) {
      this.founded_missions = this.founded_missions_p;
    }
    if (this.founded_churches_p !== undefined) {
      this.founded_churches = this.founded_churches_p;
    }
    if (this.evangelistic_visits_p !== undefined) {
      this.evangelistic_visits = this.evangelistic_visits_p;
    }
    if (this.discipleship_visits_p !== undefined) {
      this.discipleship_visits = this.discipleship_visits_p;
    }
    if (this.building_visits_p !== undefined) {
      this.building_visits = this.building_visits_p;
    }
    if (this.faith_professions_p !== undefined) {
      this.faith_professions = this.faith_professions_p;
    }
    if (this.reconciled_brothers_p !== undefined) {
      this.reconciled_brothers = this.reconciled_brothers_p;
    }
    if (this.ministered_lives_p !== undefined) {
      this.ministered_lives = this.ministered_lives_p;
    }
    if (this.cults_held_p !== undefined) {
      this.cults_held = this.cults_held_p;
    }
  },

  created() {},

  methods: {},

  watch: {
    //atributos de conceptos
    current_membership: function (val) {
      if (val >= 0) {
        this.$emit("current_membership", this.current_membership);
        //alert(this.$parent.current_membership);
      } else {
      }
    },
    congregants_count: function (val) {
      if (val >= 0) {
        this.$emit("congregants_count", this.congregants_count);
      } else {
      }
    },
    cells_count: function (val) {
      if (val >= 0) {
        this.$emit("cells_count", this.cells_count);
      } else {
      }
    },
    missions_count: function (val) {
      if (val >= 0) {
        this.$emit("missions_count", this.missions_count);
      } else {
      }
    },
    baptism_candidates: function (val) {
      if (val >= 0) {
        this.$emit("baptism_candidates", this.baptism_candidates);
      } else {
      }
    },
    baptism: function (val) {
      if (val >= 0) {
        this.$emit("baptism", this.baptism);
      } else {
      }
    },
    new_believers_discipled: function (val) {
      if (val >= 0) {
        this.$emit("new_believers_discipled", this.new_believers_discipled);
      } else {
      }
    },
    trained_leaders: function (val) {
      if (val >= 0) {
        this.$emit("trained_leaders", this.trained_leaders);
      } else {
      }
    },
    founded_cells: function (val) {
      if (val >= 0) {
        this.$emit("founded_cells", this.founded_cells);
      } else {
      }
    },
    founded_missions: function (val) {
      if (val >= 0) {
        this.$emit("founded_missions", this.founded_missions);
      } else {
      }
    },
    founded_churches: function (val) {
      if (val >= 0) {
        this.$emit("founded_churches", this.founded_churches);
      } else {
      }
    },
    evangelistic_visits: function (val) {
      if (val >= 0) {
        this.$emit("evangelistic_visits", this.evangelistic_visits);
      } else {
      }
    },
    discipleship_visits: function (val) {
      if (val >= 0) {
        this.$emit("discipleship_visits", this.discipleship_visits);
      } else {
      }
    },
    building_visits: function (val) {
      if (val >= 0) {
        this.$emit("building_visits", this.building_visits);
      } else {
      }
    },
    faith_professions: function (val) {
      if (val >= 0) {
        this.$emit("faith_professions", this.faith_professions);
      } else {
      }
    },
    reconciled_brothers: function (val) {
      if (val >= 0) {
        this.$emit("reconciled_brothers", this.reconciled_brothers);
      } else {
      }
    },
    ministered_lives: function (val) {
      if (val >= 0) {
        this.$emit("ministered_lives", this.ministered_lives);
      } else {
      }
    },
    cults_held: function (val) {
      if (val >= 0) {
        this.$emit("cults_held", this.cults_held);
      } else {
      }
    },
  },

  computed: {},

  props: {
    current_membership_p: "",
    congregants_count_p: "",
    cells_count_p: "",
    missions_count_p: "",
    baptism_candidates_p: "",
    baptism_p: "",
    new_believers_discipled_p: "",
    trained_leaders_p: "",
    founded_cells_p: "",
    founded_missions_p: "",
    founded_churches_p: "",
    evangelistic_visits_p: "",
    discipleship_visits_p: "",
    building_visits_p: "",
    faith_professions_p: "",
    reconciled_brothers_p: "",
    ministered_lives_p: "",
    cults_held_p: "",
  },
};
</script>
