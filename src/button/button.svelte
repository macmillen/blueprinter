<script lang="ts">
  import type { MappedSet } from "src/common/helpers";
  import { css } from "../utils/css";

  import type { ButtonSize, ButtonStatus } from "./button.types";

  export let classes: string = "";
  export let size: ButtonSize = "md";
  export let status: ButtonStatus = "basic";
  export let equalProportions = false;
  export let rounded = false;
  export let fullWidth = false;

  const sizeMap: MappedSet<ButtonSize> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const paddingMap: MappedSet<ButtonSize, number> = {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
  };

  const statusMap: MappedSet<ButtonStatus> = {
    danger: "text-white bg-red-500 hover:bg-red-600 ring-red-300",
    info: "text-white bg-blue-500 hover:bg-blue-600 ring-blue-300",
    primary: "text-white bg-primary-500 hover:bg-primary-600 ring-primary-300",
    success: "text-white bg-green-500 hover:bg-green-600 ring-green-300",
    basic: "text-gray-900 bg-gray-200 hover:bg-gray-300 ring-gray-300",
    warn: "text-white bg-red-500 hover:bg-red-600 ring-red-300",
    transparent: "text-gray-900 hover:bg-gray-100 ring-gray-300",
  };

  $: paddingMultiplier = equalProportions ? 1 : 2.8;
  $: paddingAmount = paddingMultiplier * paddingMap[size];
  $: paddingStyles = `padding: ${paddingMap[size]}px ${paddingAmount}px`;

  $: sizeClasses = sizeMap[size];
  $: statusClasses = statusMap[status];
  $: roundedClasses = css(rounded, "rounded-full");
  $: fullWidthClasses = css(fullWidth, "w-full");
</script>

<button
  style={paddingStyles}
  data-size={size}
  type="button"
  class="btn rounded font-medium ring-opacity-50 transition duration-300 focus:ring-4 focus:outline-none {roundedClasses} {sizeClasses} {statusClasses} {fullWidthClasses} {classes}"
  on:click
>
  <slot />
</button>
