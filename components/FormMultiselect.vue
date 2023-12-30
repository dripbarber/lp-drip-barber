<template>
  <div>
    <span class="text-sm text-gray-700 font-semibold">{{ labelTitle }}</span>
    <div
      :tabindex="searchable ? -1 : tabindex"
      :class="{
        'multiselect--active': isOpen,
        'multiselect--disabled': disabled,
        'multiselect--above': isAbove,
        'multiselect--has-options-group': hasOptionGroup,
      }"
      @focus="activate()"
      @blur="searchable ? false : deactivate()"
      @keydown.self.down.prevent="pointerForward()"
      @keydown.self.up.prevent="pointerBackward()"
      @keypress.enter.tab.stop.self="addPointerElement($event)"
      @keyup.esc="deactivate()"
      class="multiselect"
      role="combobox"
      :aria-owns="'listbox-' + id"
    >
      <slot name="caret" :toggle="toggle">
        <div
          @mousedown.prevent.stop="toggle()"
          class="multiselect__select"
        ></div>
      </slot>
      <slot name="clear" :search="search"></slot>
      <div ref="tags" class="multiselect__tags">
        <slot
          name="selection"
          :search="search"
          :remove="removeElement"
          :values="visibleValues"
          :is-open="isOpen"
        >
          <div class="multiselect__tags-wrap" v-show="visibleValues.length > 0">
            <template
              v-for="(option, index) of visibleValues"
              @mousedown.prevent
            >
              <slot
                name="tag"
                :option="option"
                :search="search"
                :remove="removeElement"
              >
                <span class="multiselect__tag" :key="index">
                  <span v-text="getOptionLabel(option)"></span>
                  <i
                    tabindex="1"
                    @keypress.enter.prevent="removeElement(option)"
                    @mousedown.prevent="removeElement(option)"
                    class="multiselect__tag-icon"
                  ></i>
                </span>
              </slot>
            </template>
          </div>
          <template v-if="internalValue && internalValue.length > limit">
            <slot name="limit">
              <strong
                class="multiselect__strong"
                v-text="limitText(internalValue.length - limit)"
              />
            </slot>
          </template>
        </slot>
        <transition name="multiselect__loading">
          <slot name="loading">
            <div v-show="loading" class="multiselect__spinner" />
          </slot>
        </transition>
        <input
          ref="search"
          v-if="searchable"
          :name="name"
          :id="id"
          type="text"
          autocomplete="off"
          spellcheck="false"
          :placeholder="placeholder"
          :style="inputStyle"
          :value="search"
          :disabled="disabled"
          :tabindex="tabindex"
          @input="updateSearch($event.target.value)"
          @focus.prevent="activate()"
          @blur.prevent="deactivate()"
          @keyup.esc="deactivate()"
          @keydown.down.prevent="pointerForward()"
          @keydown.up.prevent="pointerBackward()"
          @keypress.enter.prevent.stop.self="addPointerElement($event)"
          @keydown.delete.stop="removeLastElement()"
          class="multiselect__input"
          :aria-controls="'listbox-' + id"
        />
        <span
          v-if="isSingleLabelVisible"
          class="multiselect__single"
          @mousedown.prevent="toggle"
        >
          <slot name="singleLabel" :option="singleValue">
            <template>{{ currentOptionLabel }}</template>
          </slot>
        </span>
        <span
          v-if="isPlaceholderVisible"
          class="multiselect__placeholder"
          @mousedown.prevent="toggle"
        >
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </span>
      </div>
      <transition name="multiselect">
        <div
          class="multiselect__content-wrapper"
          v-show="isOpen"
          @focus="activate"
          tabindex="-1"
          @mousedown.prevent
          :style="{ maxHeight: optimizedHeight + 'px' }"
          ref="list"
        >
          <ul
            class="multiselect__content"
            :style="contentStyle"
            role="listbox"
            :id="'listbox-' + id"
          >
            <slot name="beforeList"></slot>
            <li v-if="multiple && max === internalValue.length">
              <span class="multiselect__option">
                <slot name="maxElements"
                  >Maximum of {{ max }} options selected. First remove a
                  selected option to select another.</slot
                >
              </span>
            </li>
            <template v-if="!max || internalValue.length < max">
              <li
                class="multiselect__element"
                v-for="(option, index) of filteredOptions"
                :key="index"
                v-bind:id="id + '-' + index"
                v-bind:role="
                  !(option && (option.$isLabel || option.$isDisabled))
                    ? 'option'
                    : null
                "
              >
                <span
                  v-if="!(option && (option.$isLabel || option.$isDisabled))"
                  :class="optionHighlight(index, option)"
                  @click.stop="select(option)"
                  @mouseenter.self="pointerSet(index)"
                  :data-select="
                    option && option.isTag ? tagPlaceholder : selectLabelText
                  "
                  :data-selected="selectedLabelText"
                  :data-deselect="deselectLabelText"
                  class="multiselect__option"
                >
                  <slot
                    name="option"
                    :option="option"
                    :search="search"
                    :index="index"
                  >
                    <span>{{ getOptionLabel(option) }}</span>
                  </slot>
                </span>
                <span
                  v-if="option && (option.$isLabel || option.$isDisabled)"
                  :data-select="groupSelect && selectGroupLabelText"
                  :data-deselect="groupSelect && deselectGroupLabelText"
                  :class="groupHighlight(index, option)"
                  @mouseenter.self="groupSelect && pointerSet(index)"
                  @mousedown.prevent="selectGroup(option)"
                  class="multiselect__option"
                >
                  <slot
                    name="option"
                    :option="option"
                    :search="search"
                    :index="index"
                  >
                    <span>{{ getOptionLabel(option) }}</span>
                  </slot>
                </span>
              </li>
            </template>
            <li
              v-show="
                showNoResults &&
                filteredOptions.length === 0 &&
                search &&
                !loading
              "
            >
              <span class="multiselect__option">
                <slot name="noResult" :search="search"
                  >No elements found. Consider changing the search query.</slot
                >
              </span>
            </li>
            <li
              v-show="
                showNoOptions &&
                (options.length === 0 ||
                  (hasOptionGroup === true && filteredOptions.length === 0)) &&
                !search &&
                !loading
              "
            >
              <span class="multiselect__option">
                <slot name="noOptions">List is empty.</slot>
              </span>
            </li>
            <slot name="afterList"></slot>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
function isEmpty(opt) {
  if (opt === 0) return false;
  if (Array.isArray(opt) && opt.length === 0) return true;
  return !opt;
}

function not(fun) {
  return (...params) => !fun(...params);
}

function includes(str, query) {
  /* istanbul ignore else */
  if (str === undefined) str = "undefined";
  if (str === null) str = "null";
  if (str === false) str = "false";
  const text = str.toString().toLowerCase();
  return text.indexOf(query.trim()) !== -1;
}

function filterOptions(options, search, label, customLabel) {
  return options.filter((option) =>
    includes(customLabel(option, label), search)
  );
}

function stripGroups(options) {
  return options.filter((option) => !option.$isLabel);
}

function flattenOptions(values, label) {
  return (options) =>
    options.reduce((prev, curr) => {
      /* istanbul ignore else */
      if (curr[values] && curr[values].length) {
        prev.push({
          $groupLabel: curr[label],
          $isLabel: true,
        });
        return prev.concat(curr[values]);
      }
      return prev;
    }, []);
}

function filterGroups(search, label, values, groupLabel, customLabel) {
  return (groups) =>
    groups.map((group) => {
      /* istanbul ignore else */
      if (!group[values]) {
        console.warn(
          `Options passed to vue-multiselect do not contain groups, despite the config.`
        );
        return [];
      }
      const groupOptions = filterOptions(
        group[values],
        search,
        label,
        customLabel
      );

      return groupOptions.length
        ? {
            [groupLabel]: group[groupLabel],
            [values]: groupOptions,
          }
        : [];
    });
}

const flow =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export default {
  data() {
    return {
      search: "",
      isOpen: false,
      preferredOpenDirection: "below",
      optimizedHeight: this.maxHeight,
      pointer: 0,
      pointerDirty: false,
    };
  },
  props: {
    /**
     * name attribute to match optional label element
     * @default ''
     * @type {String}
     */
    name: {
      type: String,
      default: "",
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectLabel: {
      type: String,
      default: "Pressione Enter para selecionar",
    },
    /**
     * String to show when pointing to an option
     * @default 'Press enter to select'
     * @type {String}
     */
    selectGroupLabel: {
      type: String,
      default: "Pressione Enter para selecionar o grupo",
    },
    /**
     * String to show next to selected option
     * @default 'Selected'
     * @type {String}
     */
    selectedLabel: {
      type: String,
      default: "Selecionado",
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectLabel: {
      type: String,
      default: "Pressione Enter para remover",
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectGroupLabel: {
      type: String,
      default: "Pressione Enter para desmarcar o grupo",
    },
    /**
     * Decide whether to show pointer labels
     * @default true
     * @type {Boolean}
     */
    showLabels: {
      type: Boolean,
      default: true,
    },
    /**
     * Limit the display of selected options. The rest will be hidden within the limitText string.
     * @default 99999
     * @type {Integer}
     */
    limit: {
      type: Number,
      default: 99999,
    },
    /**
     * Sets maxHeight style value of the dropdown
     * @default 300
     * @type {Integer}
     */
    maxHeight: {
      type: Number,
      default: 300,
    },
    /**
     * Function that process the message shown when selected
     * elements pass the defined limit.
     * @default 'and * more'
     * @param {Int} count Number of elements more than limit
     * @type {Function}
     */
    limitText: {
      type: Function,
      default: (count) => `and ${count} more`,
    },
    /**
     * Set true to trigger the loading spinner.
     * @default False
     * @type {Boolean}
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * Disables the multiselect if true.
     * @default false
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Fixed opening direction
     * @default ''
     * @type {String}
     */
    openDirection: {
      type: String,
      default: "",
    },
    /**
     * Shows slot with message about empty options
     * @default true
     * @type {Boolean}
     */
    showNoOptions: {
      type: Boolean,
      default: true,
    },
    showNoResults: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    /**
     * Decide whether to filter the results based on search query.
     * Useful for async filtering, where we search through more complex data.
     * @type {Boolean}
     */
    internalSearch: {
      type: Boolean,
      default: true,
    },
    /**
     * Array of available options: Objects, Strings or Integers.
     * If array of objects, visible label will default to option.label.
     * If `labal` prop is passed, label will equal option['label']
     * @type {Array}
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @default false
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * Presets the selected options value.
     * @type {Object||Array||String||Integer}
     */
    value: {
      type: null,
      default() {
        return [];
      },
    },
    /**
     * Key to compare objects
     * @default 'id'
     * @type {String}
     */
    trackBy: {
      type: String,
    },
    /**
     * Label to look for in option Object
     * @default 'label'
     * @type {String}
     */
    label: {
      type: String,
    },
    /**
     * Enable/disable search in options
     * @default true
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: true,
    },
    /**
     * Clear the search input after `)
     * @default true
     * @type {Boolean}
     */
    clearOnSelect: {
      type: Boolean,
      default: true,
    },
    /**
     * Hide already selected options
     * @default false
     * @type {Boolean}
     */
    hideSelected: {
      type: Boolean,
      default: false,
    },
    labelTitle: {
      type: String,
      default: "",
    },
    /**
     * Equivalent to the `placeholder` attribute on a `<select>` input.
     * @default 'Select option'
     * @type {String}
     */
    placeholder: {
      type: String,
      default: "Select option",
    },
    /**
     * Allow to remove all selected values
     * @default true
     * @type {Boolean}
     */
    allowEmpty: {
      type: Boolean,
      default: true,
    },
    /**
     * Reset this.internalValue, this.search after this.internalValue changes.
     * Useful if want to create a stateless dropdown.
     * @default false
     * @type {Boolean}
     */
    resetAfter: {
      type: Boolean,
      default: false,
    },
    /**
     * Enable/disable closing after selecting an option
     * @default true
     * @type {Boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    /**
     * Function to interpolate the custom label
     * @default false
     * @type {Function}
     */
    customLabel: {
      type: Function,
      default(option, label) {
        if (isEmpty(option)) return "";
        return label ? option[label] : option;
      },
    },
    /**
     * Disable / Enable tagging
     * @default false
     * @type {Boolean}
     */
    taggable: {
      type: Boolean,
      default: false,
    },
    /**
     * String to show when highlighting a potential tag
     * @default 'Press enter to create a tag'
     * @type {String}
     */
    tagPlaceholder: {
      type: String,
      default: "Pressione Enter para criar uma tag",
    },
    /**
     * By default new tags will appear above the search results.
     * Changing to 'bottom' will revert this behaviour
     * and will proritize the search results
     * @default 'top'
     * @type {String}
     */
    tagPosition: {
      type: String,
      default: "top",
    },
    /**
     * Number of allowed selected options. No limit if 0.
     * @default 0
     * @type {Number}
     */
    max: {
      type: [Number, Boolean],
      default: false,
    },
    /**
     * Will be passed with all events as second param.
     * Useful for identifying events origin.
     * @default null
     * @type {String|Integer}
     */
    id: {
      default: null,
    },
    /**
     * Limits the options displayed in the dropdown
     * to the first X options.
     * @default 1000
     * @type {Integer}
     */
    optionsLimit: {
      type: Number,
      default: 1000,
    },
    /**
     * Name of the property containing
     * the group values
     * @default 1000
     * @type {String}
     */
    groupValues: {
      type: String,
    },
    /**
     * Name of the property containing
     * the group label
     * @default 1000
     * @type {String}
     */
    groupLabel: {
      type: String,
    },
    /**
     * Allow to select all group values
     * by selecting the group label
     * @default false
     * @type {Boolean}
     */
    groupSelect: {
      type: Boolean,
      default: false,
    },
    /**
     * Array of keyboard keys to block
     * when selecting
     * @default 1000
     * @type {String}
     */
    blockKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * Prevent from wiping up the search value
     * @default false
     * @type {Boolean}
     */
    preserveSearch: {
      type: Boolean,
      default: false,
    },
    /**
     * Select 1st options if value is empty
     * @default false
     * @type {Boolean}
     */
    preselectFirst: {
      type: Boolean,
      default: false,
    },
    /**
     * Prevent autofocus
     * @default false
     * @type {Boolean}
     */
    preventAutofocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Enable/disable highlighting of the pointed value.
     * @type {Boolean}
     * @default true
     */
    showPointer: {
      type: Boolean,
      default: true,
    },
    optionHeight: {
      type: Number,
      default: 40,
    },
  },
  methods: {
    /**
     * Returns the internalValue in a way it can be emited to the parent
     * @returns {Object||Array||String||Integer}
     */
    getValue() {
      return this.multiple
        ? this.internalValue
        : this.internalValue.length === 0
        ? null
        : this.internalValue[0];
    },
    /**
     * Filters and then flattens the options list
     * @param  {Array}
     * @returns {Array} returns a filtered and flat options list
     */
    filterAndFlat(options, search, label) {
      return flow(
        filterGroups(
          search,
          label,
          this.groupValues,
          this.groupLabel,
          this.customLabel
        ),
        flattenOptions(this.groupValues, this.groupLabel)
      )(options);
    },
    /**
     * Flattens and then strips the group labels from the options list
     * @param  {Array}
     * @returns {Array} returns a flat options list without group labels
     */
    flatAndStrip(options) {
      return flow(
        flattenOptions(this.groupValues, this.groupLabel),
        stripGroups
      )(options);
    },
    /**
     * Updates the search value
     * @param  {String}
     */
    updateSearch(query) {
      this.search = query;
    },
    /**
     * Finds out if the given query is already present
     * in the available options
     * @param  {String}
     * @returns {Boolean} returns true if element is available
     */
    isExistingOption(query) {
      return !this.options ? false : this.optionKeys.indexOf(query) > -1;
    },
    /**
     * Finds out if the given element is already present
     * in the result value
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is selected
     */
    isSelected(option) {
      const opt = this.trackBy ? option[this.trackBy] : option;
      return this.valueKeys.indexOf(opt) > -1;
    },
    /**
     * Finds out if the given option is disabled
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is disabled
     */
    isOptionDisabled(option) {
      return !!option.$isDisabled;
    },
    /**
     * Returns empty string when options is null/undefined
     * Returns tag query if option is tag.
     * Returns the customLabel() results and casts it to string.
     *
     * @param  {Object||String||Integer} Passed option
     * @returns {Object||String}
     */
    getOptionLabel(option) {
      if (typeof option === "string") {
        return this.options.find((opt) => opt[this.trackBy] === option)[
          this.label
        ];
      }
      if (isEmpty(option)) return "";
      /* istanbul ignore else */
      if (option.isTag) return option.label;
      /* istanbul ignore else */
      if (option.$isLabel) return option.$groupLabel;

      let label = this.customLabel(option, this.label);
      /* istanbul ignore else */
      if (isEmpty(label)) return "";
      return label;
    },
    /**
     * Add the given option to the list of selected options
     * or sets the option as the selected option.
     * If option is already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} option to select/deselect
     * @param  {Boolean} block removing
     */
    select(option, key) {
      /* istanbul ignore else */
      if (option.$isLabel && this.groupSelect) {
        this.selectGroup(option);
        return;
      }
      if (
        this.blockKeys.indexOf(key) !== -1 ||
        this.disabled ||
        option.$isDisabled ||
        option.$isLabel
      )
        return;
      /* istanbul ignore else */
      if (this.max && this.multiple && this.internalValue.length === this.max)
        return;
      /* istanbul ignore else */
      if (key === "Tab" && !this.pointerDirty) return;
      if (option.isTag) {
        this.$emit("tag", option.label, this.id);
        this.search = "";
        if (this.closeOnSelect && !this.multiple) this.deactivate();
      } else {
        const isSelected = this.isSelected(option);

        if (isSelected) {
          if (key !== "Tab") this.removeElement(option);
          return;
        }

        if (this.multiple) {
          this.$emit("input", this.internalValue.concat([option]), this.id);
        } else {
          this.$emit("input", option, this.id);
        }

        this.$emit("select", option, this.id);

        /* istanbul ignore else */
        if (this.clearOnSelect) this.search = "";
      }
      /* istanbul ignore else */
      if (this.closeOnSelect) this.deactivate();
    },
    /**
     * Add the given group options to the list of selected options
     * If all group optiona are already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} group to select/deselect
     */
    selectGroup(selectedGroup) {
      const group = this.options.find((option) => {
        return option[this.groupLabel] === selectedGroup.$groupLabel;
      });

      if (!group) return;

      if (this.wholeGroupSelected(group)) {
        this.$emit("remove", group[this.groupValues], this.id);

        const newValue = this.internalValue.filter(
          (option) => group[this.groupValues].indexOf(option) === -1
        );

        this.$emit("input", newValue, this.id);
      } else {
        let optionsToAdd = group[this.groupValues].filter(
          (option) =>
            !(this.isOptionDisabled(option) || this.isSelected(option))
        );

        // if max is defined then just select options respecting max
        if (this.max) {
          optionsToAdd.splice(this.max - this.internalValue.length);
        }

        this.$emit("select", optionsToAdd, this.id);
        this.$emit("input", this.internalValue.concat(optionsToAdd), this.id);
      }

      if (this.closeOnSelect) this.deactivate();
    },
    /**
     * Helper to identify if all values in a group are selected
     *
     * @param {Object} group to validated selected values against
     */
    wholeGroupSelected(group) {
      return group[this.groupValues].every(
        (option) => this.isSelected(option) || this.isOptionDisabled(option)
      );
    },
    /**
     * Helper to identify if all values in a group are disabled
     *
     * @param {Object} group to check for disabled values
     */
    wholeGroupDisabled(group) {
      return group[this.groupValues].every(this.isOptionDisabled);
    },
    /**
     * Removes the given option from the selected options.
     * Additionally checks this.allowEmpty prop if option can be removed when
     * it is the last selected option.
     *
     * @param  {type} option description
     * @returns {type}        description
     */
    removeElement(option, shouldClose = true) {
      /* istanbul ignore else */
      if (this.disabled) return;
      /* istanbul ignore else */
      if (option.$isDisabled) return;
      /* istanbul ignore else */
      if (!this.allowEmpty && this.internalValue.length <= 1) {
        this.deactivate();
        return;
      }

      const index =
        typeof option === "object"
          ? this.valueKeys.indexOf(option[this.trackBy])
          : this.valueKeys.indexOf(option);

      if (this.multiple) {
        const newValue = this.internalValue
          .slice(0, index)
          .concat(this.internalValue.slice(index + 1));
        this.$emit("input", newValue, this.id);
      } else {
        this.$emit("input", null, this.id);
      }
      this.$emit("remove", option, this.id);

      /* istanbul ignore else */
      if (this.closeOnSelect && shouldClose) this.deactivate();
    },
    /**
     * Calls this.removeElement() with the last element
     * from this.internalValue (selected element Array)
     *
     * @fires this#removeElement
     */
    removeLastElement() {
      /* istanbul ignore else */
      if (this.blockKeys.indexOf("Delete") !== -1) return;
      /* istanbul ignore else */
      if (
        this.search.length === 0 &&
        Array.isArray(this.internalValue) &&
        this.internalValue.length
      ) {
        this.removeElement(
          this.internalValue[this.internalValue.length - 1],
          false
        );
      }
    },
    /**
     * Opens the multiselect’s dropdown.
     * Sets this.isOpen to TRUE
     */
    activate() {
      /* istanbul ignore else */
      if (this.isOpen || this.disabled) return;

      this.adjustPosition();
      /* istanbul ignore else  */
      if (
        this.groupValues &&
        this.pointer === 0 &&
        this.filteredOptions.length
      ) {
        this.pointer = 1;
      }

      this.isOpen = true;
      /* istanbul ignore else  */
      if (this.searchable) {
        if (!this.preserveSearch) this.search = "";
        if (!this.preventAutofocus)
          this.$nextTick(() => this.$refs.search && this.$refs.search.focus());
      } else if (!this.preventAutofocus) {
        if (typeof this.$el !== "undefined") this.$el.focus();
      }
      this.$emit("open", this.id);
    },
    /**
     * Closes the multiselect’s dropdown.
     * Sets this.isOpen to FALSE
     */
    deactivate() {
      /* istanbul ignore else */
      if (!this.isOpen) return;

      this.isOpen = false;
      /* istanbul ignore else  */
      if (this.searchable) {
        if (
          this.$refs.search !== null &&
          typeof this.$refs.search !== "undefined"
        )
          this.$refs.search.blur();
      } else {
        if (typeof this.$el !== "undefined") this.$el.blur();
      }
      if (!this.preserveSearch) this.search = "";
      this.$emit("close", this.getValue(), this.id);
    },
    /**
     * Call this.activate() or this.deactivate()
     * depending on this.isOpen value.
     *
     * @fires this#activate || this#deactivate
     * @property {Boolean} isOpen indicates if dropdown is open
     */
    toggle() {
      this.isOpen ? this.deactivate() : this.activate();
    },
    /**
     * Updates the hasEnoughSpace variable used for
     * detecting where to expand the dropdown
     */
    adjustPosition() {
      if (typeof window === "undefined") return;

      const spaceAbove = this.$el.getBoundingClientRect().top;
      const spaceBelow =
        window.innerHeight - this.$el.getBoundingClientRect().bottom;
      const hasEnoughSpaceBelow = spaceBelow > this.maxHeight;

      if (
        hasEnoughSpaceBelow ||
        spaceBelow > spaceAbove ||
        this.openDirection === "below" ||
        this.openDirection === "bottom"
      ) {
        this.preferredOpenDirection = "below";
        this.optimizedHeight = Math.min(spaceBelow - 40, this.maxHeight);
      } else {
        this.preferredOpenDirection = "above";
        this.optimizedHeight = Math.min(spaceAbove - 40, this.maxHeight);
      }
    },
    optionHighlight(index, option) {
      return {
        "multiselect__option--highlight":
          index === this.pointer && this.showPointer,
        "multiselect__option--selected": this.isSelected(option),
      };
    },
    groupHighlight(index, selectedGroup) {
      if (!this.groupSelect) {
        return [
          "multiselect__option--disabled",
          { "multiselect__option--group": selectedGroup.$isLabel },
        ];
      }

      const group = this.options.find((option) => {
        return option[this.groupLabel] === selectedGroup.$groupLabel;
      });

      return group && !this.wholeGroupDisabled(group)
        ? [
            "multiselect__option--group",
            {
              "multiselect__option--highlight":
                index === this.pointer && this.showPointer,
            },
            {
              "multiselect__option--group-selected":
                this.wholeGroupSelected(group),
            },
          ]
        : "multiselect__option--disabled";
    },
    addPointerElement({ key } = "Enter") {
      /* istanbul ignore else */
      if (this.filteredOptions.length > 0) {
        this.select(this.filteredOptions[this.pointer], key);
      }
      this.pointerReset();
    },
    pointerForward() {
      /* istanbul ignore else */
      if (this.pointer < this.filteredOptions.length - 1) {
        this.pointer++;
        /* istanbul ignore next */
        if (
          this.$refs.list.scrollTop <=
          this.pointerPosition - (this.visibleElements - 1) * this.optionHeight
        ) {
          this.$refs.list.scrollTop =
            this.pointerPosition -
            (this.visibleElements - 1) * this.optionHeight;
        }
        /* istanbul ignore else */
        if (
          this.filteredOptions[this.pointer] &&
          this.filteredOptions[this.pointer].$isLabel &&
          !this.groupSelect
        )
          this.pointerForward();
      }
      this.pointerDirty = true;
    },
    pointerBackward() {
      if (this.pointer > 0) {
        this.pointer--;
        /* istanbul ignore else */
        if (this.$refs.list.scrollTop >= this.pointerPosition) {
          this.$refs.list.scrollTop = this.pointerPosition;
        }
        /* istanbul ignore else */
        if (
          this.filteredOptions[this.pointer] &&
          this.filteredOptions[this.pointer].$isLabel &&
          !this.groupSelect
        )
          this.pointerBackward();
      } else {
        /* istanbul ignore else */
        if (
          this.filteredOptions[this.pointer] &&
          this.filteredOptions[0].$isLabel &&
          !this.groupSelect
        )
          this.pointerForward();
      }
      this.pointerDirty = true;
    },
    pointerReset() {
      /* istanbul ignore else */
      if (!this.closeOnSelect) return;
      this.pointer = 0;
      /* istanbul ignore else */
      if (this.$refs.list) {
        this.$refs.list.scrollTop = 0;
      }
    },
    pointerAdjust() {
      /* istanbul ignore else */
      if (this.pointer >= this.filteredOptions.length - 1) {
        this.pointer = this.filteredOptions.length
          ? this.filteredOptions.length - 1
          : 0;
      }

      if (
        this.filteredOptions.length > 0 &&
        this.filteredOptions[this.pointer].$isLabel &&
        !this.groupSelect
      ) {
        this.pointerForward();
      }
    },
    pointerSet(index) {
      this.pointer = index;
      this.pointerDirty = true;
    },
  },
  computed: {
    hasOptionGroup() {
      return this.groupValues && this.groupLabel && this.groupSelect;
    },
    isSingleLabelVisible() {
      return (
        (this.singleValue || this.singleValue === 0) &&
        (!this.isOpen || !this.searchable) &&
        !this.visibleValues.length
      );
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && (!this.searchable || !this.isOpen);
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0];
    },
    deselectLabelText() {
      return this.showLabels ? this.deselectLabel : "";
    },
    deselectGroupLabelText() {
      return this.showLabels ? this.deselectGroupLabel : "";
    },
    selectLabelText() {
      return this.showLabels ? this.selectLabel : "";
    },
    selectGroupLabelText() {
      return this.showLabels ? this.selectGroupLabel : "";
    },
    selectedLabelText() {
      return this.showLabels ? this.selectedLabel : "";
    },
    inputStyle() {
      if (
        this.searchable ||
        (this.multiple && this.value && this.value.length)
      ) {
        // Hide input by setting the width to 0 allowing it to receive focus
        return this.isOpen
          ? { width: "100%" }
          : { width: "0", position: "absolute", padding: "0" };
      }
      return "";
    },
    contentStyle() {
      return this.options.length
        ? { display: "inline-block" }
        : { display: "block" };
    },
    isAbove() {
      if (this.openDirection === "above" || this.openDirection === "top") {
        return true;
      } else if (
        this.openDirection === "below" ||
        this.openDirection === "bottom"
      ) {
        return false;
      } else {
        return this.preferredOpenDirection === "above";
      }
    },
    showSearchInput() {
      return (
        this.searchable &&
        (this.hasSingleSelectedSlot &&
        (this.visibleSingleValue || this.visibleSingleValue === 0)
          ? this.isOpen
          : true)
      );
    },
    internalValue() {
      return this.value || this.value === 0
        ? Array.isArray(this.value)
          ? this.value
          : [this.value]
        : [];
    },
    filteredOptions() {
      const search = this.search || "";
      const normalizedSearch = search.toLowerCase().trim();

      let options = this.options.concat();

      /* istanbul ignore else */
      if (this.internalSearch) {
        options = this.groupValues
          ? this.filterAndFlat(options, normalizedSearch, this.label)
          : filterOptions(
              options,
              normalizedSearch,
              this.label,
              this.customLabel
            );
      } else {
        options = this.groupValues
          ? flattenOptions(this.groupValues, this.groupLabel)(options)
          : options;
      }

      options = this.hideSelected
        ? options.filter(not(this.isSelected))
        : options;

      /* istanbul ignore else */
      if (
        this.taggable &&
        normalizedSearch.length &&
        !this.isExistingOption(normalizedSearch)
      ) {
        if (this.tagPosition === "bottom") {
          options.push({ isTag: true, label: search });
        } else {
          options.unshift({ isTag: true, label: search });
        }
      }

      return options.slice(0, this.optionsLimit);
    },
    valueKeys() {
      if (this.trackBy) {
        return this.internalValue.map((element) => element[this.trackBy]);
      } else {
        return this.internalValue;
      }
    },
    optionKeys() {
      const options = this.groupValues
        ? this.flatAndStrip(this.options)
        : this.options;
      return options.map((element) =>
        this.customLabel(element, this.label).toString().toLowerCase()
      );
    },
    currentOptionLabel() {
      return this.multiple
        ? this.searchable
          ? ""
          : this.placeholder
        : this.internalValue.length
        ? this.getOptionLabel(this.internalValue[0])
        : this.searchable
        ? ""
        : this.placeholder;
    },
    pointerPosition() {
      return this.pointer * this.optionHeight;
    },
    visibleElements() {
      return this.optimizedHeight / this.optionHeight;
    },
  },
  watch: {
    internalValue() {
      /* istanbul ignore else */
      if (this.resetAfter && this.internalValue.length) {
        this.search = "";
        this.$emit("input", this.multiple ? [] : null);
      }
    },
    search() {
      this.$emit("search-change", this.search, this.id);
    },
    filteredOptions() {
      this.pointerAdjust();
    },
    isOpen() {
      this.pointerDirty = false;
    },
    pointer() {
      this.$refs.search &&
        this.$refs.search.setAttribute(
          "aria-activedescendant",
          this.id + "-" + this.pointer.toString()
        );
    },
  },
  mounted() {
    /* istanbul ignore else */
    if (!this.multiple && this.max) {
      console.warn(
        "[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."
      );
    }
    if (
      this.preselectFirst &&
      !this.internalValue.length &&
      this.options.length
    ) {
      this.select(this.filteredOptions[0]);
    }
  },
};
</script>

<style>
fieldset[disabled] .multiselect {
  pointer-events: none;
}

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 40px;
  height: 38px;
  background: #fff;
  display: block;
}

.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41b883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}

.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #35495e;
}

.multiselect * {
  box-sizing: border-box;
}

.multiselect:focus {
  outline: none;
}

.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}

.multiselect--active {
  z-index: 50;
}

.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}

.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}

.multiselect__input::placeholder {
  color: #35495e;
}

.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}

.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}

.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}

.multiselect__tags-wrap {
  display: inline;
}

.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #41b883;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}

.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}

.multiselect__tag-icon:after {
  content: "×";
  color: #266d4d;
  font-size: 14px;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #369a6e;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}

.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}

.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #999999 transparent transparent transparent;
  content: "";
}

.multiselect__placeholder {
  color: #adadad;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}

.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}

.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #e8e8e8;
}

.multiselect__content::webkit-scrollbar {
  display: none;
}

.multiselect__element {
  display: block;
}

.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}

.multiselect__option--highlight {
  background: #41b883;
  outline: none;
  color: white;
}

.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #41b883;
  color: white;
}

.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
  background: inherit;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}

.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}

.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}

.multiselect__option--group.multiselect__option--highlight {
  background: #35495e;
  color: #fff;
}

.multiselect__option--group.multiselect__option--highlight:after {
  background: #35495e;
}

.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}

.multiselect__option--group-selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}

.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}

.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}

.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}

.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}

*[dir="rtl"] .multiselect {
  text-align: right;
}

*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}

*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}

*[dir="rtl"] .multiselect__content {
  text-align: right;
}

*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}

*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}

*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
</style>