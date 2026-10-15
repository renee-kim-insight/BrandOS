import { Accordion } from "@base-ui/react/accordion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, ArrowDownIcon, ArrowRightIcon, ArrowUpDownIcon, ArrowUpIcon, BoldIcon, BotIcon, CalendarIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronsUpDownIcon, CircleAlertIcon, CircleCheckIcon, CopyIcon, CreditCardIcon, FileSearchIcon, FileTextIcon, GitBranchIcon, GlobeIcon, HomeIcon, ImageIcon, InfoIcon, ItalicIcon, LibraryIcon, Loader2Icon, MinusIcon, MoreHorizontalIcon, OctagonXIcon, PanelLeftIcon, PaperclipIcon, PencilIcon, PinIcon, PlusIcon, RotateCcwIcon, SearchIcon, SettingsIcon, ShareIcon, SheetIcon, SparklesIcon, SquareTerminalIcon, Trash2Icon, TriangleAlertIcon, UserIcon, XIcon } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createElement, useMemo } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Avatar } from "@base-ui/react/avatar";
import { Separator } from "@base-ui/react/separator";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import useEmblaCarousel from "embla-carousel-react";
import * as RechartsPrimitive from "recharts";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Checkbox } from "@base-ui/react/checkbox";
import { Collapsible } from "@base-ui/react/collapsible";
import { Combobox } from "@base-ui/react";
import { Input } from "@base-ui/react/input";
import { Command } from "cmdk";
import { Dialog } from "@base-ui/react/dialog";
import { ContextMenu } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import { format } from "date-fns";
import { Popover } from "@base-ui/react/popover";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Slider } from "@base-ui/react/slider";
import { Drawer } from "@base-ui/react/drawer";
import { Progress } from "@base-ui/react/progress";
import { Switch } from "@base-ui/react/switch";
import { PreviewCard } from "@base-ui/react/preview-card";
import { OTPInput, OTPInputContext } from "input-otp";
import { Menubar } from "@base-ui/react/menubar";
import { MessageScroller } from "@shadcn/react/message-scroller";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { toast } from "sonner";
import { Questionnaire } from "@shadcn/react/questionnaire";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import * as ResizablePrimitive from "react-resizable-panels";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { Select } from "@base-ui/react/select";
import { Tooltip } from "@base-ui/react/tooltip";
import { Tabs } from "@base-ui/react/tabs";
import { Toast } from "@base-ui/react/toast";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { renderToStaticMarkup } from "react-dom/server";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/icon-placeholder.tsx
var ICONS = {
	ArrowDownIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	CircleCheckIcon,
	CopyIcon,
	InfoIcon,
	Loader2Icon,
	MinusIcon,
	MoreHorizontalIcon,
	OctagonXIcon,
	PanelLeftIcon,
	SearchIcon,
	TriangleAlertIcon,
	XIcon
};
function IconPlaceholder({ lucide, tabler: _t, hugeicons: _h, phosphor: _p, remixicon: _r, ...props }) {
	const Icon = ICONS[lucide];
	return /* @__PURE__ */ jsx(Icon, { ...props });
}
//#endregion
//#region src/components/ui/accordion.tsx
function Accordion$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Root, {
		"data-slot": "accordion",
		className: cn("cn-accordion flex w-full flex-col", className),
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Item, {
		"data-slot": "accordion-item",
		className: cn("cn-accordion-item", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Header, {
		className: "flex",
		children: /* @__PURE__ */ jsxs(Accordion.Trigger, {
			"data-slot": "accordion-trigger",
			className: cn("cn-accordion-trigger group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50", className),
			...props,
			children: [
				children,
				/* @__PURE__ */ jsx(IconPlaceholder, {
					lucide: "ChevronDownIcon",
					tabler: "IconChevronDown",
					"data-slot": "accordion-trigger-icon",
					hugeicons: "ArrowDown01Icon",
					phosphor: "CaretDownIcon",
					remixicon: "RiArrowDownSLine",
					className: "cn-accordion-trigger-icon pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
				}),
				/* @__PURE__ */ jsx(IconPlaceholder, {
					lucide: "ChevronUpIcon",
					tabler: "IconChevronUp",
					"data-slot": "accordion-trigger-icon",
					hugeicons: "ArrowUp01Icon",
					phosphor: "CaretUpIcon",
					remixicon: "RiArrowUpSLine",
					className: "cn-accordion-trigger-icon pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
				})
			]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Panel, {
		"data-slot": "accordion-content",
		className: "cn-accordion-content overflow-hidden",
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("cn-accordion-content-inner h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className),
			children
		})
	});
}
//#endregion
//#region src/components/ui/card.tsx
function Card({ className, size = "default", variant = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		"data-size": size,
		"data-variant": variant,
		className: cn("cn-card group/card flex flex-col", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("cn-card-header group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("cn-card-title cn-font-heading", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-description",
		className: cn("cn-card-description", className),
		...props
	});
}
function CardAction({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-action",
		className: cn("cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("cn-card-content", className),
		...props
	});
}
function CardFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-footer",
		className: cn("cn-card-footer flex items-center", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/accordion.tsx
var accordion_exports = /* @__PURE__ */ __exportAll({ default: () => AccordionDemo });
var faqs = [
	{
		value: "data",
		q: "Where does an agent's data go?",
		a: "Runs stay inside your workspace's region. Inputs and outputs are kept for 30 days, then deleted unless you pin the run."
	},
	{
		value: "cost",
		q: "How is usage billed?",
		a: "Each run is billed by the tokens it uses. Set a monthly budget and runs pause when you reach it."
	},
	{
		value: "share",
		q: "Can I share an agent with a client?",
		a: "Yes. Publish it to a client workspace and they can run it with their own data. They never see your prompts."
	}
];
function AccordionDemo() {
	return /* @__PURE__ */ jsx(Card, {
		variant: "glass",
		className: "w-full max-w-lg px-6 py-2",
		children: /* @__PURE__ */ jsx(Accordion$1, {
			defaultValue: ["data"],
			children: faqs.map((f) => /* @__PURE__ */ jsxs(AccordionItem, {
				value: f.value,
				children: [/* @__PURE__ */ jsx(AccordionTrigger, { children: f.q }), /* @__PURE__ */ jsx(AccordionContent, { children: f.a })]
			}, f.value))
		})
	});
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("cn-button group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "cn-button-variant-default",
			outline: "cn-button-variant-outline",
			secondary: "cn-button-variant-secondary",
			ghost: "cn-button-variant-ghost",
			destructive: "cn-button-variant-destructive",
			link: "cn-button-variant-link",
			glass: "cn-button-variant-glass"
		},
		size: {
			default: "cn-button-size-default",
			xs: "cn-button-size-xs",
			sm: "cn-button-size-sm",
			lg: "cn-button-size-lg",
			icon: "cn-button-size-icon",
			"icon-xs": "cn-button-size-icon-xs",
			"icon-sm": "cn-button-size-icon-sm",
			"icon-lg": "cn-button-size-icon-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
function AlertDialog$1({ ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Root, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Trigger, {
		"data-slot": "alert-dialog-trigger",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Portal, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Backdrop, {
		"data-slot": "alert-dialog-overlay",
		className: cn("cn-alert-dialog-overlay fixed inset-0 isolate z-50", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialog.Popup, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("cn-alert-dialog-content group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-dialog-header",
		className: cn("cn-alert-dialog-header", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("cn-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Title, {
		"data-slot": "alert-dialog-title",
		className: cn("cn-alert-dialog-title cn-font-heading", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Description, {
		"data-slot": "alert-dialog-description",
		className: cn("cn-alert-dialog-description", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ jsx(Button$1, {
		"data-slot": "alert-dialog-action",
		className: cn("cn-alert-dialog-action", className),
		...props
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Close, {
		"data-slot": "alert-dialog-cancel",
		className: cn("cn-alert-dialog-cancel", className),
		render: /* @__PURE__ */ jsx(Button$1, {
			variant,
			size
		}),
		...props
	});
}
//#endregion
//#region src/docs/demos/alert-dialog.tsx
var alert_dialog_exports = /* @__PURE__ */ __exportAll({ default: () => AlertDialogDemo });
function AlertDialogDemo() {
	return /* @__PURE__ */ jsxs(AlertDialog$1, { children: [/* @__PURE__ */ jsx(AlertDialogTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "destructive" }),
		children: "Delete agent"
	}), /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Proposal writer?" }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Its run history and shared links go with it. People who rely on it will see an error the next time they run it." })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Keep agent" }), /* @__PURE__ */ jsx(AlertDialogAction, {
		variant: "destructive",
		children: "Delete agent"
	})] })] })] });
}
//#endregion
//#region src/components/ui/alert.tsx
var alertVariants = cva("cn-alert group/alert relative w-full", {
	variants: { variant: {
		default: "cn-alert-variant-default",
		destructive: "cn-alert-variant-destructive"
	} },
	defaultVariants: { variant: "default" }
});
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-title",
		className: cn("cn-alert-title [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className),
		...props
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-description",
		className: cn("cn-alert-description [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className),
		...props
	});
}
function AlertAction({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-action",
		className: cn("cn-alert-action", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/alert.tsx
var alert_exports = /* @__PURE__ */ __exportAll({ default: () => AlertDemo });
function AlertDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-lg flex-col gap-4",
		children: [/* @__PURE__ */ jsxs(Alert, { children: [
			/* @__PURE__ */ jsx(InfoIcon, {}),
			/* @__PURE__ */ jsx(AlertTitle, { children: "New model available" }),
			/* @__PURE__ */ jsx(AlertDescription, { children: "Agents on the default model will switch on Monday. Pin a version to keep the current one." }),
			/* @__PURE__ */ jsx(AlertAction, { children: /* @__PURE__ */ jsx(Button$1, {
				size: "sm",
				variant: "outline",
				children: "Pin version"
			}) })
		] }), /* @__PURE__ */ jsxs(Alert, {
			variant: "destructive",
			children: [
				/* @__PURE__ */ jsx(CircleAlertIcon, {}),
				/* @__PURE__ */ jsx(AlertTitle, { children: "Payment failed" }),
				/* @__PURE__ */ jsx(AlertDescription, { children: "Runs pause in 3 days. Update the card on file to keep them going." })
			]
		})]
	});
}
//#endregion
//#region src/components/ui/aspect-ratio.tsx
function AspectRatio({ ratio, className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "aspect-ratio",
		style: { "--ratio": ratio },
		className: cn("relative aspect-(--ratio)", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/aspect-ratio.tsx
var aspect_ratio_exports = /* @__PURE__ */ __exportAll({ default: () => AspectRatioDemo });
function AspectRatioDemo() {
	return /* @__PURE__ */ jsx("div", {
		className: "w-full max-w-md",
		children: /* @__PURE__ */ jsx(AspectRatio, {
			ratio: 16 / 9,
			className: "overflow-hidden rounded-3xl border",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex size-full items-end p-5",
				style: { background: "linear-gradient(135deg, var(--backdrop-1), var(--backdrop-2) 55%, var(--backdrop-3))" },
				children: /* @__PURE__ */ jsx("span", {
					className: "glass rounded-full border px-3 py-1 text-xs font-medium",
					children: "16 : 9"
				})
			})
		})
	});
}
//#endregion
//#region src/components/ui/attachment.tsx
var attachmentVariants = cva("cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed", { variants: {
	size: {
		default: "cn-attachment-size-default",
		sm: "cn-attachment-size-sm",
		xs: "cn-attachment-size-xs"
	},
	orientation: {
		horizontal: "cn-attachment-orientation-horizontal items-center",
		vertical: "cn-attachment-orientation-vertical flex-col"
	}
} });
function Attachment({ className, state = "done", size = "default", orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "attachment",
		"data-state": state,
		"data-size": size,
		"data-orientation": orientation,
		className: cn(attachmentVariants({
			size,
			orientation
		}), className),
		...props
	});
}
var attachmentMediaVariants = cva("cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none", {
	variants: { variant: {
		icon: "cn-attachment-media-variant-icon",
		image: "cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover"
	} },
	defaultVariants: { variant: "icon" }
});
function AttachmentMedia({ className, variant = "icon", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "attachment-media",
		"data-variant": variant,
		className: cn(attachmentMediaVariants({ variant }), className),
		...props
	});
}
function AttachmentContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "attachment-content",
		className: cn("cn-attachment-content max-w-full min-w-0 flex-1", className),
		...props
	});
}
function AttachmentTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "attachment-title",
		className: cn("cn-attachment-title block max-w-full min-w-0 truncate group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer", className),
		...props
	});
}
function AttachmentDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "attachment-description",
		className: cn("cn-attachment-description block min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80", "max-w-full", className),
		...props
	});
}
function AttachmentActions({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "attachment-actions",
		className: cn("cn-attachment-actions flex shrink-0 items-center", className),
		...props
	});
}
function AttachmentAction({ className, variant, size = "icon-xs", ...props }) {
	return /* @__PURE__ */ jsx(Button$1, {
		"data-slot": "attachment-action",
		variant: variant ?? "ghost",
		size,
		className: cn("cn-attachment-action", className),
		...props
	});
}
function AttachmentGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "attachment-group",
		className: cn("cn-attachment-group flex min-w-0 scroll-fade-x snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/attachment.tsx
var attachment_exports = /* @__PURE__ */ __exportAll({ default: () => AttachmentDemo });
var files = [
	{
		name: "discovery-notes.pdf",
		meta: "PDF · 2.4 MB",
		icon: FileTextIcon,
		state: "done"
	},
	{
		name: "pricing-model.xlsx",
		meta: "Uploading · 64%",
		icon: SheetIcon,
		state: "uploading"
	},
	{
		name: "site-photo.png",
		meta: "PNG · 840 KB",
		icon: ImageIcon,
		state: "done"
	}
];
function AttachmentDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-lg flex-col gap-6",
		children: [files.slice(0, 2).map((f) => /* @__PURE__ */ jsxs(Attachment, {
			state: f.state,
			className: "w-full",
			children: [
				/* @__PURE__ */ jsx(AttachmentMedia, { children: /* @__PURE__ */ jsx(f.icon, {}) }),
				/* @__PURE__ */ jsxs(AttachmentContent, { children: [/* @__PURE__ */ jsx(AttachmentTitle, { children: f.name }), /* @__PURE__ */ jsx(AttachmentDescription, { children: f.meta })] }),
				/* @__PURE__ */ jsx(AttachmentActions, { children: /* @__PURE__ */ jsx(AttachmentAction, {
					"aria-label": `Remove ${f.name}`,
					children: /* @__PURE__ */ jsx(XIcon, {})
				}) })
			]
		}, f.name)), /* @__PURE__ */ jsx(AttachmentGroup, {
			className: "gap-2",
			children: files.map((f) => /* @__PURE__ */ jsxs(Attachment, {
				size: "sm",
				children: [/* @__PURE__ */ jsx(AttachmentMedia, { children: /* @__PURE__ */ jsx(f.icon, {}) }), /* @__PURE__ */ jsx(AttachmentContent, { children: /* @__PURE__ */ jsx(AttachmentTitle, { children: f.name }) })]
			}, f.name))
		})]
	});
}
//#endregion
//#region src/components/ui/avatar.tsx
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Root, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("cn-avatar group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Image, {
		"data-slot": "avatar-image",
		className: cn("cn-avatar-image aspect-square size-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ jsx(Avatar.Fallback, {
		"data-slot": "avatar-fallback",
		className: cn("cn-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
function AvatarBadge({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "avatar-badge",
		className: cn("cn-avatar-badge absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none", "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden", "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2", "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2", className),
		...props
	});
}
function AvatarGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "avatar-group",
		className: cn("cn-avatar-group group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", className),
		...props
	});
}
function AvatarGroupCount({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "avatar-group-count",
		className: cn("cn-avatar-group-count relative flex shrink-0 items-center justify-center ring-2 ring-background", "", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/avatar.tsx
var avatar_exports = /* @__PURE__ */ __exportAll({ default: () => AvatarDemo });
function AvatarDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-center gap-10",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-end gap-4",
			children: [
				/* @__PURE__ */ jsx(Avatar$1, {
					size: "sm",
					children: /* @__PURE__ */ jsx(AvatarFallback, { children: "RK" })
				}),
				/* @__PURE__ */ jsxs(Avatar$1, { children: [/* @__PURE__ */ jsx(AvatarImage, {
					src: "https://github.com/shadcn.png",
					alt: "shadcn"
				}), /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })] }),
				/* @__PURE__ */ jsxs(Avatar$1, {
					size: "lg",
					children: [/* @__PURE__ */ jsx(AvatarFallback, { children: "SW" }), /* @__PURE__ */ jsx(AvatarBadge, { className: "bg-green-600" })]
				})
			]
		}), /* @__PURE__ */ jsxs(AvatarGroup, { children: [[
			"RK",
			"SW",
			"JD",
			"AM"
		].map((i) => /* @__PURE__ */ jsx(Avatar$1, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: i }) }, i)), /* @__PURE__ */ jsx(AvatarGroupCount, { children: "+8" })] })]
	});
}
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("cn-badge group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none", {
	variants: { variant: {
		default: "cn-badge-variant-default",
		secondary: "cn-badge-variant-secondary",
		destructive: "cn-badge-variant-destructive",
		outline: "cn-badge-variant-outline",
		ghost: "cn-badge-variant-ghost",
		link: "cn-badge-variant-link",
		glass: "cn-badge-variant-glass"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant = "default", render, ...props }) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps({ className: cn(badgeVariants({ variant }), className) }, props),
		render,
		state: {
			slot: "badge",
			variant
		}
	});
}
//#endregion
//#region src/docs/demos/badge.tsx
var badge_exports = /* @__PURE__ */ __exportAll({ default: () => BadgeDemo });
function BadgeDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex max-w-md flex-wrap items-center justify-center gap-2.5",
		children: [
			/* @__PURE__ */ jsx(Badge, { children: "Published" }),
			/* @__PURE__ */ jsx(Badge, {
				variant: "glass",
				children: "Beta"
			}),
			/* @__PURE__ */ jsx(Badge, {
				variant: "secondary",
				children: "Sales"
			}),
			/* @__PURE__ */ jsx(Badge, {
				variant: "outline",
				children: "Draft"
			}),
			/* @__PURE__ */ jsx(Badge, {
				variant: "destructive",
				children: "Failed"
			}),
			/* @__PURE__ */ jsx(Badge, {
				variant: "ghost",
				children: "Archived"
			}),
			/* @__PURE__ */ jsxs(Badge, {
				variant: "secondary",
				children: [/* @__PURE__ */ jsx(CheckIcon, { "data-icon": "inline-start" }), "Verified"]
			}),
			/* @__PURE__ */ jsx(Badge, {
				variant: "link",
				render: /* @__PURE__ */ jsx("a", { href: "#" }),
				children: "12 runs today"
			})
		]
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
function Breadcrumb({ className, ...props }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		className: cn("cn-breadcrumb", className),
		...props
	});
}
function BreadcrumbList({ className, ...props }) {
	return /* @__PURE__ */ jsx("ol", {
		"data-slot": "breadcrumb-list",
		className: cn("cn-breadcrumb-list flex flex-wrap items-center wrap-break-word", className),
		...props
	});
}
function BreadcrumbItem({ className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "breadcrumb-item",
		className: cn("cn-breadcrumb-item inline-flex items-center", className),
		...props
	});
}
function BreadcrumbLink({ className, render, ...props }) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps({ className: cn("cn-breadcrumb-link", className) }, props),
		render,
		state: { slot: "breadcrumb-link" }
	});
}
function BreadcrumbPage({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: cn("cn-breadcrumb-page", className),
		...props
	});
}
function BreadcrumbSeparator({ children, className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: cn("cn-breadcrumb-separator", className),
		...props,
		children: children ?? /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronRightIcon",
			tabler: "IconChevronRight",
			hugeicons: "ArrowRight01Icon",
			phosphor: "CaretRightIcon",
			remixicon: "RiArrowRightSLine",
			className: "cn-rtl-flip"
		})
	});
}
function BreadcrumbEllipsis({ className, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		"data-slot": "breadcrumb-ellipsis",
		role: "presentation",
		"aria-hidden": "true",
		className: cn("cn-breadcrumb-ellipsis flex items-center justify-center", className),
		...props,
		children: [/* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "MoreHorizontalIcon",
			tabler: "IconDots",
			hugeicons: "MoreHorizontalCircle01Icon",
			phosphor: "DotsThreeIcon",
			remixicon: "RiMoreLine"
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "More"
		})]
	});
}
//#endregion
//#region src/docs/demos/breadcrumb.tsx
var breadcrumb_exports = /* @__PURE__ */ __exportAll({ default: () => BreadcrumbDemo });
function BreadcrumbDemo() {
	return /* @__PURE__ */ jsx(Breadcrumb, {
		className: "glass rounded-full border px-5 py-2.5",
		children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
			/* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, {
				href: "#",
				children: "Workspace"
			}) }),
			/* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
			/* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbEllipsis, {}) }),
			/* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
			/* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, {
				href: "#",
				children: "Agents"
			}) }),
			/* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
			/* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: "Proposal writer" }) })
		] })
	});
}
//#endregion
//#region src/components/ui/bubble.tsx
function BubbleGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "bubble-group",
		className: cn("cn-bubble-group flex min-w-0 flex-col", className),
		...props
	});
}
var bubbleVariants = cva("cn-bubble group/bubble relative flex w-fit min-w-0 flex-col", {
	variants: { variant: {
		default: "cn-bubble-variant-default",
		secondary: "cn-bubble-variant-secondary",
		muted: "cn-bubble-variant-muted",
		tinted: "cn-bubble-variant-tinted",
		outline: "cn-bubble-variant-outline",
		ghost: "cn-bubble-variant-ghost",
		destructive: "cn-bubble-variant-destructive"
	} },
	defaultVariants: { variant: "default" }
});
function Bubble({ variant = "default", align = "start", className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "bubble",
		"data-variant": variant,
		"data-align": align,
		className: cn(bubbleVariants({ variant }), className),
		...props
	});
}
function BubbleContent({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors", className) }, props),
		render,
		state: { slot: "bubble-content" }
	});
}
cva("cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center", {
	variants: {
		side: {
			top: "cn-bubble-reactions-side-top",
			bottom: "cn-bubble-reactions-side-bottom"
		},
		align: {
			start: "cn-bubble-reactions-align-start",
			end: "cn-bubble-reactions-align-end"
		}
	},
	defaultVariants: {
		side: "bottom",
		align: "end"
	}
});
//#endregion
//#region src/docs/demos/bubble.tsx
var bubble_exports = /* @__PURE__ */ __exportAll({ default: () => BubbleDemo });
function BubbleDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-md flex-col gap-6",
		children: [
			/* @__PURE__ */ jsx(Bubble, {
				align: "end",
				children: /* @__PURE__ */ jsx(BubbleContent, { children: "Can you summarise the client call in five bullets?" })
			}),
			/* @__PURE__ */ jsxs(BubbleGroup, { children: [/* @__PURE__ */ jsx(Bubble, {
				variant: "secondary",
				children: /* @__PURE__ */ jsx(BubbleContent, { children: "Here is the summary. Their main worry is migration time, not price." })
			}), /* @__PURE__ */ jsx(Bubble, {
				variant: "secondary",
				children: /* @__PURE__ */ jsx(BubbleContent, { children: "Want me to draft a follow-up email that addresses it?" })
			})] }),
			/* @__PURE__ */ jsx(Bubble, {
				variant: "tinted",
				align: "end",
				children: /* @__PURE__ */ jsx(BubbleContent, { children: "Yes, keep it under 120 words." })
			}),
			/* @__PURE__ */ jsx(Bubble, {
				variant: "destructive",
				children: /* @__PURE__ */ jsx(BubbleContent, { children: "The CRM connection expired. Reconnect it in Settings to continue." })
			})
		]
	});
}
//#endregion
//#region src/components/ui/separator.tsx
function Separator$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ jsx(Separator, {
		"data-slot": "separator",
		orientation,
		className: cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
		...props
	});
}
//#endregion
//#region src/components/ui/button-group.tsx
var buttonGroupVariants = cva("cn-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1", {
	variants: { orientation: {
		horizontal: "cn-button-group-orientation-horizontal *:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
		vertical: "cn-button-group-orientation-vertical flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"
	} },
	defaultVariants: { orientation: "horizontal" }
});
function ButtonGroup({ className, orientation, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "button-group",
		"data-orientation": orientation,
		className: cn(buttonGroupVariants({ orientation }), className),
		...props
	});
}
function ButtonGroupText({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("cn-button-group-text flex items-center [&_svg]:pointer-events-none", className) }, props),
		render,
		state: { slot: "button-group-text" }
	});
}
function ButtonGroupSeparator({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx(Separator$1, {
		"data-slot": "button-group-separator",
		orientation,
		className: cn("cn-button-group-separator relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/button-group.tsx
var button_group_exports = /* @__PURE__ */ __exportAll({ default: () => ButtonGroupDemo });
function ButtonGroupDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-6",
		children: [
			/* @__PURE__ */ jsxs(ButtonGroup, { children: [
				/* @__PURE__ */ jsxs(Button$1, {
					variant: "outline",
					children: [/* @__PURE__ */ jsx(CopyIcon, { "data-icon": "inline-start" }), "Duplicate"]
				}),
				/* @__PURE__ */ jsxs(Button$1, {
					variant: "outline",
					children: [/* @__PURE__ */ jsx(ShareIcon, { "data-icon": "inline-start" }), "Share"]
				}),
				/* @__PURE__ */ jsxs(Button$1, {
					variant: "outline",
					children: [/* @__PURE__ */ jsx(RotateCcwIcon, { "data-icon": "inline-start" }), "Re-run"]
				})
			] }),
			/* @__PURE__ */ jsxs(ButtonGroup, { children: [
				/* @__PURE__ */ jsx(Button$1, { children: "Publish" }),
				/* @__PURE__ */ jsx(ButtonGroupSeparator, {}),
				/* @__PURE__ */ jsx(Button$1, {
					size: "icon",
					"aria-label": "More publish options",
					children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
				})
			] }),
			/* @__PURE__ */ jsxs(ButtonGroup, { children: [/* @__PURE__ */ jsx(ButtonGroupText, { children: "Version" }), /* @__PURE__ */ jsx(Button$1, {
				variant: "outline",
				children: "v2.3"
			})] })
		]
	});
}
//#endregion
//#region src/components/ui/spinner.tsx
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ jsx(IconPlaceholder, {
		lucide: "Loader2Icon",
		tabler: "IconLoader",
		hugeicons: "Loading03Icon",
		phosphor: "SpinnerIcon",
		remixicon: "RiLoaderLine",
		"data-slot": "spinner",
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/button.tsx
var button_exports = /* @__PURE__ */ __exportAll({ default: () => ButtonDemo });
function ButtonDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex max-w-xl flex-col items-center gap-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ jsx(Button$1, { children: "Publish agent" }),
					/* @__PURE__ */ jsx(Button$1, {
						variant: "glass",
						children: "Save draft"
					}),
					/* @__PURE__ */ jsx(Button$1, {
						variant: "outline",
						children: "Preview"
					}),
					/* @__PURE__ */ jsx(Button$1, {
						variant: "secondary",
						children: "Duplicate"
					}),
					/* @__PURE__ */ jsx(Button$1, {
						variant: "ghost",
						children: "Cancel"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ jsx(Button$1, {
						variant: "destructive",
						children: "Delete agent"
					}),
					/* @__PURE__ */ jsx(Button$1, {
						variant: "link",
						children: "View run history"
					}),
					/* @__PURE__ */ jsxs(Button$1, {
						size: "sm",
						variant: "glass",
						children: [/* @__PURE__ */ jsx(PlusIcon, { "data-icon": "inline-start" }), "New run"]
					}),
					/* @__PURE__ */ jsxs(Button$1, {
						size: "lg",
						children: ["Get started", /* @__PURE__ */ jsx(ArrowRightIcon, { "data-icon": "inline-end" })]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ jsx(Button$1, {
						size: "icon",
						variant: "glass",
						"aria-label": "Generate with AI",
						children: /* @__PURE__ */ jsx(SparklesIcon, {})
					}),
					/* @__PURE__ */ jsx(Button$1, {
						size: "icon",
						"aria-label": "Add",
						children: /* @__PURE__ */ jsx(PlusIcon, {})
					}),
					/* @__PURE__ */ jsxs(Button$1, {
						disabled: true,
						children: [/* @__PURE__ */ jsx(Spinner, { "data-icon": "inline-start" }), "Publishing"]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/calendar.tsx
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", locale, formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ jsx(DayPicker, {
		showOutsideDays,
		className: cn("cn-calendar group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		locale,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("cn-calendar-dropdown-root relative rounded-(--cell-radius)", defaultClassNames.dropdown_root),
			dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
			caption_label: cn("font-medium select-none", captionLayout === "label" ? "cn-calendar-caption text-sm" : "cn-calendar-caption-label flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", defaultClassNames.caption_label),
			month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-[0.8rem] text-muted-foreground select-none", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)", props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)", defaultClassNames.day),
			range_start: cn("relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted", defaultClassNames.range_end),
			today: cn("rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ jsx("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ jsx(IconPlaceholder, {
					lucide: "ChevronLeftIcon",
					tabler: "IconChevronLeft",
					hugeicons: "ArrowLeftIcon",
					phosphor: "CaretLeftIcon",
					remixicon: "RiArrowLeftSLine",
					className: cn("cn-rtl-flip size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ jsx(IconPlaceholder, {
					lucide: "ChevronRightIcon",
					tabler: "IconChevronRight",
					hugeicons: "ArrowRightIcon",
					phosphor: "CaretRightIcon",
					remixicon: "RiArrowRightSLine",
					className: cn("cn-rtl-flip size-4", className),
					...props
				});
				return /* @__PURE__ */ jsx(IconPlaceholder, {
					lucide: "ChevronDownIcon",
					tabler: "IconChevronDown",
					hugeicons: "ArrowDownIcon",
					phosphor: "CaretDownIcon",
					remixicon: "RiArrowDownSLine",
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: ({ ...props }) => /* @__PURE__ */ jsx(CalendarDayButton, {
				locale,
				...props
			}),
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ jsx("td", {
					...props,
					children: /* @__PURE__ */ jsx("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, locale, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = React.useRef(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ jsx(Button$1, {
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(locale?.code),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("cn-calendar-day-button relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
//#endregion
//#region src/docs/demos/calendar.tsx
var calendar_exports = /* @__PURE__ */ __exportAll({ default: () => CalendarDemo });
function CalendarDemo() {
	const [date, setDate] = React.useState(new Date(2026, 9, 15));
	const [range, setRange] = React.useState({
		from: new Date(2026, 9, 12),
		to: new Date(2026, 9, 16)
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-start justify-center gap-6",
		children: [/* @__PURE__ */ jsx(Card, {
			variant: "glass",
			className: "p-3",
			children: /* @__PURE__ */ jsx(Calendar, {
				mode: "single",
				selected: date,
				onSelect: setDate,
				defaultMonth: new Date(2026, 9, 1)
			})
		}), /* @__PURE__ */ jsx(Card, {
			variant: "glass",
			className: "p-3",
			children: /* @__PURE__ */ jsx(Calendar, {
				mode: "range",
				selected: range,
				onSelect: setRange,
				defaultMonth: new Date(2026, 9, 1)
			})
		})]
	});
}
//#endregion
//#region src/docs/demos/card.tsx
var card_exports = /* @__PURE__ */ __exportAll({ default: () => CardDemo });
function AgentCard({ variant }) {
	return /* @__PURE__ */ jsxs(Card, {
		variant,
		className: "w-full max-w-xs",
		children: [
			/* @__PURE__ */ jsxs(CardHeader, { children: [
				/* @__PURE__ */ jsx(CardTitle, { children: "Proposal writer" }),
				/* @__PURE__ */ jsx(CardDescription, { children: "Drafts client proposals from discovery notes and past wins." }),
				/* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx(Badge, {
					variant: variant === "glass" ? "glass" : "secondary",
					children: "Sales"
				}) })
			] }),
			/* @__PURE__ */ jsx(CardContent, {
				className: "text-muted-foreground text-sm",
				children: "Last run 2 hours ago by Sam Wong"
			}),
			/* @__PURE__ */ jsxs(CardFooter, {
				className: "justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground text-xs",
					children: variant === "glass" ? "variant=\"glass\"" : "default"
				}), /* @__PURE__ */ jsx(Button$1, {
					size: "sm",
					children: "Run agent"
				})]
			})
		]
	});
}
function CardDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-wrap items-stretch justify-center gap-6",
		children: [/* @__PURE__ */ jsx(AgentCard, { variant: "default" }), /* @__PURE__ */ jsx(AgentCard, { variant: "glass" })]
	});
}
//#endregion
//#region src/components/ui/carousel.tsx
var CarouselContext = React.createContext(null);
function useCarousel() {
	const context = React.useContext(CarouselContext);
	if (!context) throw new Error("useCarousel must be used within a <Carousel />");
	return context;
}
function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) {
	const [carouselRef, api] = useEmblaCarousel({
		...opts,
		axis: orientation === "horizontal" ? "x" : "y"
	}, plugins);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);
	const onSelect = React.useCallback((api) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);
	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);
	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);
	const handleKeyDown = React.useCallback((event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollPrev();
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollNext();
		}
	}, [scrollPrev, scrollNext]);
	React.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);
	React.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);
		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);
	return /* @__PURE__ */ jsx(CarouselContext.Provider, {
		value: {
			carouselRef,
			api,
			opts,
			orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
			scrollPrev,
			scrollNext,
			canScrollPrev,
			canScrollNext
		},
		children: /* @__PURE__ */ jsx("div", {
			onKeyDownCapture: handleKeyDown,
			className: cn("relative", className),
			role: "region",
			"aria-roledescription": "carousel",
			"data-slot": "carousel",
			...props,
			children
		})
	});
}
function CarouselContent({ className, ...props }) {
	const { carouselRef, orientation } = useCarousel();
	return /* @__PURE__ */ jsx("div", {
		ref: carouselRef,
		className: "overflow-hidden",
		"data-slot": "carousel-content",
		children: /* @__PURE__ */ jsx("div", {
			className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
			...props
		})
	});
}
function CarouselItem({ className, ...props }) {
	const { orientation } = useCarousel();
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"aria-roledescription": "slide",
		"data-slot": "carousel-item",
		className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
		...props
	});
}
function CarouselPrevious({ className, variant = "outline", size = "icon-sm", ...props }) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();
	return /* @__PURE__ */ jsxs(Button$1, {
		"data-slot": "carousel-previous",
		variant,
		size,
		className: cn("cn-carousel-previous absolute touch-manipulation", orientation === "horizontal" ? "inset-y-0 -left-12 my-auto" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollPrev,
		onClick: scrollPrev,
		...props,
		children: [/* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronLeftIcon",
			tabler: "IconChevronLeft",
			hugeicons: "ArrowLeft01Icon",
			phosphor: "CaretLeftIcon",
			remixicon: "RiArrowLeftSLine",
			className: "cn-rtl-flip"
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Previous slide"
		})]
	});
}
function CarouselNext({ className, variant = "outline", size = "icon-sm", ...props }) {
	const { orientation, scrollNext, canScrollNext } = useCarousel();
	return /* @__PURE__ */ jsxs(Button$1, {
		"data-slot": "carousel-next",
		variant,
		size,
		className: cn("cn-carousel-next absolute touch-manipulation", orientation === "horizontal" ? "inset-y-0 -right-12 my-auto" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollNext,
		onClick: scrollNext,
		...props,
		children: [/* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronRightIcon",
			tabler: "IconChevronRight",
			hugeicons: "ArrowRight01Icon",
			phosphor: "CaretRightIcon",
			remixicon: "RiArrowRightSLine",
			className: "cn-rtl-flip"
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Next slide"
		})]
	});
}
//#endregion
//#region src/docs/demos/carousel.tsx
var carousel_exports = /* @__PURE__ */ __exportAll({ default: () => CarouselDemo });
var slides = [
	{
		title: "Discover",
		body: "Find the repeatable task that eats real hours."
	},
	{
		title: "Prototype",
		body: "Build it with the team and test it on live work."
	},
	{
		title: "Measure",
		body: "Track time saved and quality, run by run."
	},
	{
		title: "Scale",
		body: "Publish it so every team can use it."
	}
];
function CarouselDemo() {
	return /* @__PURE__ */ jsxs(Carousel, {
		className: "w-full max-w-xs",
		children: [
			/* @__PURE__ */ jsx(CarouselContent, { children: slides.map((s) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx(Card, {
				variant: "glass",
				className: "aspect-square justify-end",
				children: /* @__PURE__ */ jsxs(CardContent, {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-2xl font-semibold tracking-tight",
						children: s.title
					}), /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground text-sm",
						children: s.body
					})]
				})
			}) }, s.title)) }),
			/* @__PURE__ */ jsx(CarouselPrevious, { variant: "glass" }),
			/* @__PURE__ */ jsx(CarouselNext, { variant: "glass" })
		]
	});
}
//#endregion
//#region src/components/ui/chart.tsx
var THEMES = {
	light: "",
	dark: ".dark"
};
var INITIAL_DIMENSION = {
	width: 320,
	height: 200
};
var ChartContext = React.createContext(null);
function useChart() {
	const context = React.useContext(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
function ChartContainer({ id, className, children, config, initialDimension = INITIAL_DIMENSION, ...props }) {
	const uniqueId = React.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ jsx(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ jsxs("div", {
			"data-slot": "chart",
			"data-chart": chartId,
			className: cn("cn-chart flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className),
			...props,
			children: [/* @__PURE__ */ jsx(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, {
				initialDimension,
				children
			})]
		})
	});
}
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme ?? config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] ?? itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n") } });
};
var ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }) {
	const { config } = useChart();
	const tooltipLabel = React.useMemo(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
		const itemConfig = getPayloadConfigFromPayload(config, item, key);
		const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ jsx("div", {
			className: cn("font-medium", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ jsx("div", {
			className: cn("font-medium", labelClassName),
			children: value
		});
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	if (!active || !payload?.length) return null;
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ jsxs("div", {
		className: cn("cn-chart-tooltip grid min-w-32 items-start", className),
		children: [!nestLabel ? tooltipLabel : null, /* @__PURE__ */ jsx("div", {
			className: "grid gap-1.5",
			children: payload.filter((item) => item.type !== "none").map((item, index) => {
				const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
				const itemConfig = getPayloadConfigFromPayload(config, item, key);
				const indicatorColor = color ?? item.payload?.fill ?? item.color;
				return /* @__PURE__ */ jsx("div", {
					className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx("div", {
						className: cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
							"h-2.5 w-2.5": indicator === "dot",
							"w-1": indicator === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
							"my-0.5": nestLabel && indicator === "dashed"
						}),
						style: {
							"--color-bg": indicatorColor,
							"--color-border": indicatorColor
						}
					}), /* @__PURE__ */ jsxs("div", {
						className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-1.5",
							children: [nestLabel ? tooltipLabel : null, /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: itemConfig?.label ?? item.name
							})]
						}), item.value != null && /* @__PURE__ */ jsx("span", {
							className: "font-mono font-medium text-foreground tabular-nums",
							children: typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)
						})]
					})] })
				}, index);
			})
		})]
	});
}
var ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }) {
	const { config } = useChart();
	if (!payload?.length) return null;
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className),
		children: payload.filter((item) => item.type !== "none").map((item, index) => {
			const key = `${nameKey ?? item.dataKey ?? "value"}`;
			const itemConfig = getPayloadConfigFromPayload(config, item, key);
			return /* @__PURE__ */ jsxs("div", {
				className: cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
				children: [itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx("div", {
					className: "h-2 w-2 shrink-0 rounded-[2px]",
					style: { backgroundColor: item.color }
				}), itemConfig?.label]
			}, index);
		})
	});
}
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) return;
	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
	else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
	return configLabelKey in config ? config[configLabelKey] : config[key];
}
//#endregion
//#region src/docs/demos/chart.tsx
var chart_exports = /* @__PURE__ */ __exportAll({ default: () => ChartDemo });
var data = [
	{
		month: "May",
		manual: 186,
		agent: 80
	},
	{
		month: "Jun",
		manual: 160,
		agent: 120
	},
	{
		month: "Jul",
		manual: 142,
		agent: 168
	},
	{
		month: "Aug",
		manual: 120,
		agent: 210
	},
	{
		month: "Sep",
		manual: 98,
		agent: 246
	},
	{
		month: "Oct",
		manual: 84,
		agent: 274
	}
];
var config = {
	agent: {
		label: "With an agent",
		color: "var(--chart-1)"
	},
	manual: {
		label: "Manual",
		color: "var(--chart-3)"
	}
};
function ChartDemo() {
	return /* @__PURE__ */ jsxs(Card, {
		variant: "glass",
		className: "w-full max-w-xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Proposals drafted" }), /* @__PURE__ */ jsx(CardDescription, { children: "May to October, sample data" })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ChartContainer, {
			config,
			className: "aspect-[16/9] w-full",
			children: /* @__PURE__ */ jsxs(BarChart, {
				data,
				children: [
					/* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
					/* @__PURE__ */ jsx(XAxis, {
						dataKey: "month",
						tickLine: false,
						axisLine: false,
						tickMargin: 8
					}),
					/* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}) }),
					/* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) }),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "agent",
						fill: "var(--color-agent)",
						radius: 6
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "manual",
						fill: "var(--color-manual)",
						radius: 6
					})
				]
			})
		}) })]
	});
}
//#endregion
//#region src/components/ui/checkbox.tsx
function Checkbox$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Checkbox.Root, {
		"data-slot": "checkbox",
		className: cn("cn-checkbox peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(Checkbox.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "cn-checkbox-indicator grid place-content-center text-current transition-none",
			children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "CheckIcon",
				tabler: "IconCheck",
				hugeicons: "Tick02Icon",
				phosphor: "CheckIcon",
				remixicon: "RiCheckLine"
			})
		})
	});
}
//#endregion
//#region src/components/ui/label.tsx
function Label({ className, ...props }) {
	return /* @__PURE__ */ jsx("label", {
		"data-slot": "label",
		className: cn("cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed", className),
		...props
	});
}
//#endregion
//#region src/components/ui/field.tsx
function FieldSet({ className, ...props }) {
	return /* @__PURE__ */ jsx("fieldset", {
		"data-slot": "field-set",
		className: cn("cn-field-set flex flex-col", className),
		...props
	});
}
function FieldLegend({ className, variant = "legend", ...props }) {
	return /* @__PURE__ */ jsx("legend", {
		"data-slot": "field-legend",
		"data-variant": variant,
		className: cn("cn-field-legend", className),
		...props
	});
}
function FieldGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "field-group",
		className: cn("cn-field-group group/field-group @container/field-group flex w-full flex-col", className),
		...props
	});
}
var fieldVariants = cva("cn-field group/field flex w-full", {
	variants: { orientation: {
		vertical: "cn-field-orientation-vertical flex-col *:w-full [&>.sr-only]:w-auto",
		horizontal: "cn-field-orientation-horizontal flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
		responsive: "cn-field-orientation-responsive flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...props
	});
}
function FieldContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "field-content",
		className: cn("cn-field-content group/field-content flex flex-1 flex-col leading-snug", className),
		...props
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label, {
		"data-slot": "field-label",
		className: cn("cn-field-label group/field-label peer/field-label flex w-fit", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", className),
		...props
	});
}
function FieldDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("p", {
		"data-slot": "field-description",
		className: cn("cn-field-description leading-normal font-normal group-has-data-horizontal/field:text-balance", "last:mt-0 nth-last-2:-mt-1", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
function FieldSeparator({ children, className, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "field-separator",
		"data-content": !!children,
		className: cn("cn-field-separator relative", className),
		...props,
		children: [/* @__PURE__ */ jsx(Separator$1, { className: "absolute inset-0 top-1/2" }), children && /* @__PURE__ */ jsx("span", {
			className: "cn-field-separator-content relative mx-auto block w-fit bg-background",
			"data-slot": "field-separator-content",
			children
		})]
	});
}
function FieldError({ className, children, errors, ...props }) {
	const content = useMemo(() => {
		if (children) return children;
		if (!errors?.length) return null;
		const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
		if (uniqueErrors?.length == 1) return uniqueErrors[0]?.message;
		return /* @__PURE__ */ jsx("ul", {
			className: "ml-4 flex list-disc flex-col gap-1",
			children: uniqueErrors.map((error, index) => error?.message && /* @__PURE__ */ jsx("li", { children: error.message }, index))
		});
	}, [children, errors]);
	if (!content) return null;
	return /* @__PURE__ */ jsx("div", {
		role: "alert",
		"data-slot": "field-error",
		className: cn("cn-field-error font-normal", className),
		...props,
		children: content
	});
}
//#endregion
//#region src/docs/demos/checkbox.tsx
var checkbox_exports = /* @__PURE__ */ __exportAll({ default: () => CheckboxDemo });
function CheckboxDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-sm flex-col gap-5",
		children: [
			/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsx(Checkbox$1, {
					id: "cb-terms",
					defaultChecked: true
				}), /* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "cb-terms",
					children: "Share run history with my team"
				})]
			}),
			/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsx(Checkbox$1, { id: "cb-pii" }), /* @__PURE__ */ jsxs(FieldContent, { children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "cb-pii",
					children: "Redact personal details"
				}), /* @__PURE__ */ jsx(FieldDescription, { children: "Names, emails and phone numbers are masked before the model sees them." })] })]
			}),
			/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				"data-disabled": true,
				children: [/* @__PURE__ */ jsx(Checkbox$1, {
					id: "cb-locked",
					disabled: true,
					defaultChecked: true
				}), /* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "cb-locked",
					children: "Audit logging (set by your admin)"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ui/code-block.tsx
var codeBlockVariants = cva("cn-code-block group/code-block relative flex w-full min-w-0 flex-col overflow-hidden", {
	variants: { variant: {
		default: "cn-code-block-variant-default",
		destructive: "cn-code-block-variant-destructive"
	} },
	defaultVariants: { variant: "default" }
});
function CodeBlock({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "code-block",
		"data-variant": variant,
		"data-size": size,
		className: cn(codeBlockVariants({ variant }), className),
		...props
	});
}
function CodeBlockHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "code-block-header",
		className: cn("cn-code-block-header flex min-w-0 shrink-0 items-center *:has-[>[data-slot=code-block-title]]:min-w-0", className),
		...props
	});
}
function CodeBlockTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "code-block-title",
		className: cn("cn-code-block-title min-w-0 truncate [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle", className),
		...props
	});
}
function CodeBlockActions({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "code-block-actions",
		className: cn("cn-code-block-actions ms-auto flex shrink-0 items-center [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100", className),
		...props
	});
}
function CodeBlockCopyButton({ value, variant = "ghost", size = "icon-xs", className, onClick, ...props }) {
	const [copied, setCopied] = React.useState(false);
	React.useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 2e3);
		return () => clearTimeout(timeout);
	}, [copied]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button$1, {
		"data-slot": "code-block-copy-button",
		"data-copied": copied || void 0,
		variant,
		size,
		"aria-label": copied ? "Copied" : "Copy",
		className: cn("cn-code-block-copy-button", className),
		onClick: (event) => {
			onClick?.(event);
			navigator.clipboard.writeText(value).then(() => setCopied(true)).catch(() => {});
		},
		...props,
		children: copied ? /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "CheckIcon",
			tabler: "IconCheck",
			hugeicons: "Tick02Icon",
			phosphor: "CheckIcon",
			remixicon: "RiCheckLine"
		}) : /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "CopyIcon",
			tabler: "IconCopy",
			hugeicons: "Copy01Icon",
			phosphor: "CopyIcon",
			remixicon: "RiFileCopyLine"
		})
	}), /* @__PURE__ */ jsx("span", {
		"aria-live": "polite",
		className: "sr-only",
		children: copied ? "Copied" : ""
	})] });
}
function CodeBlockContent({ className, children, style, wrap = false, lineNumbers = false, startLine = 1, ...props }) {
	return /* @__PURE__ */ jsx("pre", {
		"data-slot": "code-block-content",
		"data-wrap": wrap || void 0,
		"data-numbered": lineNumbers || void 0,
		dir: "ltr",
		tabIndex: 0,
		style: {
			counterReset: `line ${startLine - 1}`,
			...style
		},
		className: cn("cn-code-block-content min-h-0 min-w-0 scroll-fade-x scrollbar-thin overflow-auto text-start font-mono outline-none data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap", className),
		...props,
		children: /* @__PURE__ */ jsx("code", {
			"data-slot": "code-block-code",
			className: "cn-code-block-code grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0",
			children: lineNumbers && typeof children === "string" ? children.replace(/\n$/, "").split("\n").map((line, index) => /* @__PURE__ */ jsx(CodeBlockLine, { children: line }, index)) : children
		})
	});
}
var codeBlockLineVariants = cva("cn-code-block-line relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']", {
	variants: { variant: {
		default: "cn-code-block-line-variant-default",
		added: "cn-code-block-line-variant-added",
		removed: "cn-code-block-line-variant-removed",
		highlighted: "cn-code-block-line-variant-highlighted"
	} },
	defaultVariants: { variant: "default" }
});
function CodeBlockLine({ className, variant = "default", children, ...props }) {
	const empty = children === void 0 || children === null || children === "" || Array.isArray(children) && children.length === 0;
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "code-block-line",
		"data-variant": variant,
		className: cn(codeBlockLineVariants({ variant }), className),
		...props,
		children: /* @__PURE__ */ jsx("span", {
			"data-slot": "code-block-line-content",
			className: "min-w-0",
			children: empty ? "\n" : children
		})
	});
}
//#endregion
//#region src/docs/demos/code-block.tsx
var code_block_exports = /* @__PURE__ */ __exportAll({ default: () => CodeBlockDemo });
var lines = [
	{ text: "import { Button } from \"@/components/ui/button\"" },
	{ text: "" },
	{ text: "export function Publish() {" },
	{
		text: "  return <Button variant=\"default\">Publish</Button>",
		variant: "removed"
	},
	{
		text: "  return <Button variant=\"glass\">Publish</Button>",
		variant: "added"
	},
	{ text: "}" }
];
function CodeBlockDemo() {
	const source = lines.filter((l) => l.variant !== "removed").map((l) => l.text).join("\n");
	return /* @__PURE__ */ jsxs(CodeBlock, {
		className: "glass bg-glass w-full max-w-xl border",
		children: [/* @__PURE__ */ jsxs(CodeBlockHeader, { children: [/* @__PURE__ */ jsx(CodeBlockTitle, {
			className: "font-mono text-xs",
			children: "publish.tsx"
		}), /* @__PURE__ */ jsx(CodeBlockActions, { children: /* @__PURE__ */ jsx(CodeBlockCopyButton, {
			value: source,
			"aria-label": "Copy code"
		}) })] }), /* @__PURE__ */ jsx(CodeBlockContent, {
			lineNumbers: true,
			children: lines.map((l, i) => /* @__PURE__ */ jsx(CodeBlockLine, {
				variant: l.variant,
				children: l.text
			}, i))
		})]
	});
}
//#endregion
//#region src/components/ui/collapsible.tsx
function Collapsible$1({ ...props }) {
	return /* @__PURE__ */ jsx(Collapsible.Root, {
		"data-slot": "collapsible",
		...props
	});
}
function CollapsibleTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Collapsible.Trigger, {
		"data-slot": "collapsible-trigger",
		...props
	});
}
function CollapsibleContent({ ...props }) {
	return /* @__PURE__ */ jsx(Collapsible.Panel, {
		"data-slot": "collapsible-content",
		...props
	});
}
//#endregion
//#region src/docs/demos/collapsible.tsx
var collapsible_exports = /* @__PURE__ */ __exportAll({ default: () => CollapsibleDemo });
function CollapsibleDemo() {
	return /* @__PURE__ */ jsx(Card, {
		variant: "glass",
		className: "w-full max-w-sm gap-3 px-5 py-4",
		children: /* @__PURE__ */ jsxs(Collapsible$1, {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-sm font-semibold",
						children: "3 tools connected"
					}), /* @__PURE__ */ jsx(CollapsibleTrigger, {
						render: /* @__PURE__ */ jsx(Button$1, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Show tools"
						}),
						children: /* @__PURE__ */ jsx(ChevronsUpDownIcon, {})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "rounded-2xl border px-4 py-2.5 text-sm",
					children: "SharePoint"
				}),
				/* @__PURE__ */ jsxs(CollapsibleContent, {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "rounded-2xl border px-4 py-2.5 text-sm",
						children: "Salesforce"
					}), /* @__PURE__ */ jsx("div", {
						className: "rounded-2xl border px-4 py-2.5 text-sm",
						children: "Outlook calendar"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/ui/input.tsx
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		type,
		"data-slot": "input",
		className: cn("cn-input w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ jsx("textarea", {
		"data-slot": "textarea",
		className: cn("cn-textarea flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region src/components/ui/input-group.tsx
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group cn-input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto", className),
		...props
	});
}
var inputGroupAddonVariants = cva("cn-input-group-addon flex cursor-text items-center justify-center select-none", {
	variants: { align: {
		"inline-start": "cn-input-group-addon-align-inline-start order-first",
		"inline-end": "cn-input-group-addon-align-inline-end order-last",
		"block-start": "cn-input-group-addon-align-block-start order-first w-full justify-start",
		"block-end": "cn-input-group-addon-align-block-end order-last w-full justify-start"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("cn-input-group-button flex items-center shadow-none", {
	variants: { size: {
		xs: "cn-input-group-button-size-xs",
		sm: "cn-input-group-button-size-sm",
		"icon-xs": "cn-input-group-button-size-icon-xs",
		"icon-sm": "cn-input-group-button-size-icon-sm"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ jsx(Button$1, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupText({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn("cn-input-group-text flex items-center [&_svg]:pointer-events-none", className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ jsx(Input$1, {
		"data-slot": "input-group-control",
		className: cn("cn-input-group-input flex-1", className),
		...props
	});
}
function InputGroupTextarea({ className, ...props }) {
	return /* @__PURE__ */ jsx(Textarea, {
		"data-slot": "input-group-control",
		className: cn("cn-input-group-textarea flex-1 resize-none", className),
		...props
	});
}
//#endregion
//#region src/components/ui/combobox.tsx
var Combobox$1 = Combobox.Root;
function ComboboxTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Combobox.Trigger, {
		"data-slot": "combobox-trigger",
		className: cn("cn-combobox-trigger", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronDownIcon",
			tabler: "IconChevronDown",
			hugeicons: "ArrowDown01Icon",
			phosphor: "CaretDownIcon",
			remixicon: "RiArrowDownSLine",
			className: "cn-combobox-trigger-icon pointer-events-none"
		})]
	});
}
function ComboboxClear({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Clear, {
		"data-slot": "combobox-clear",
		render: /* @__PURE__ */ jsx(InputGroupButton, {
			variant: "ghost",
			size: "icon-xs"
		}),
		className: cn("cn-combobox-clear", className),
		...props,
		children: /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "XIcon",
			tabler: "IconX",
			hugeicons: "Cancel01Icon",
			phosphor: "XIcon",
			remixicon: "RiCloseLine",
			className: "cn-combobox-clear-icon pointer-events-none"
		})
	});
}
function ComboboxInput({ className, children, disabled = false, showTrigger = true, showClear = false, ...props }) {
	return /* @__PURE__ */ jsxs(InputGroup, {
		className: cn("cn-combobox-input w-auto", className),
		children: [
			/* @__PURE__ */ jsx(Combobox.Input, {
				render: /* @__PURE__ */ jsx(InputGroupInput, { disabled }),
				...props
			}),
			/* @__PURE__ */ jsxs(InputGroupAddon, {
				align: "inline-end",
				children: [showTrigger && /* @__PURE__ */ jsx(InputGroupButton, {
					size: "icon-xs",
					variant: "ghost",
					render: /* @__PURE__ */ jsx(ComboboxTrigger, {}),
					"data-slot": "input-group-button",
					className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
					disabled
				}), showClear && /* @__PURE__ */ jsx(ComboboxClear, { disabled })]
			}),
			children
		]
	});
}
function ComboboxContent({ className, side = "bottom", sideOffset = 6, align = "start", alignOffset = 0, anchor, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Portal, { children: /* @__PURE__ */ jsx(Combobox.Positioner, {
		side,
		sideOffset,
		align,
		alignOffset,
		anchor,
		className: "isolate z-50",
		children: /* @__PURE__ */ jsx(Combobox.Popup, {
			"data-slot": "combobox-content",
			"data-chips": !!anchor,
			className: cn("cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width)", className),
			...props
		})
	}) });
}
function ComboboxList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.List, {
		"data-slot": "combobox-list",
		className: cn("cn-combobox-list overflow-y-auto overscroll-contain", className),
		...props
	});
}
function ComboboxItem({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Combobox.Item, {
		"data-slot": "combobox-item",
		className: cn("cn-combobox-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Combobox.ItemIndicator, {
			render: /* @__PURE__ */ jsx("span", { className: "cn-combobox-item-indicator" }),
			children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "CheckIcon",
				tabler: "IconCheck",
				hugeicons: "Tick02Icon",
				phosphor: "CheckIcon",
				remixicon: "RiCheckLine",
				className: "cn-combobox-item-indicator-icon pointer-events-none"
			})
		})]
	});
}
function ComboboxEmpty({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Empty, {
		"data-slot": "combobox-empty",
		className: cn("cn-combobox-empty", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/combobox.tsx
var combobox_exports = /* @__PURE__ */ __exportAll({ default: () => ComboboxDemo });
var agents = [
	"Proposal writer",
	"Meeting summariser",
	"Contract reviewer",
	"Pricing assistant",
	"Release notes drafter",
	"Support triage",
	"Token cost reporter"
];
function ComboboxDemo() {
	return /* @__PURE__ */ jsx("div", {
		className: "w-full max-w-xs",
		children: /* @__PURE__ */ jsxs(Combobox$1, {
			items: agents,
			children: [/* @__PURE__ */ jsx(ComboboxInput, {
				placeholder: "Find an agent",
				"aria-label": "Agent"
			}), /* @__PURE__ */ jsxs(ComboboxContent, { children: [/* @__PURE__ */ jsx(ComboboxEmpty, { children: "No agent with that name." }), /* @__PURE__ */ jsx(ComboboxList, { children: (item) => /* @__PURE__ */ jsx(ComboboxItem, {
				value: item,
				children: item
			}, item) })] })]
		})
	});
}
//#endregion
//#region src/components/ui/dialog.tsx
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		"data-slot": "dialog",
		...props
	});
}
function DialogTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Trigger, {
		"data-slot": "dialog-trigger",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogClose({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Close, {
		"data-slot": "dialog-close",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Backdrop, {
		"data-slot": "dialog-overlay",
		className: cn("cn-dialog-overlay fixed inset-0 isolate z-50", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Popup, {
		"data-slot": "dialog-content",
		className: cn("cn-dialog-content fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ jsx(Button$1, {
				variant: "ghost",
				className: "cn-dialog-close",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "XIcon",
				tabler: "IconX",
				hugeicons: "Cancel01Icon",
				phosphor: "XIcon",
				remixicon: "RiCloseLine"
			}), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-header",
		className: cn("cn-dialog-header flex flex-col", className),
		...props
	});
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "dialog-footer",
		className: cn("cn-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsx(Dialog.Close, {
			render: /* @__PURE__ */ jsx(Button$1, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "dialog-title",
		className: cn("cn-dialog-title cn-font-heading", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Description, {
		"data-slot": "dialog-description",
		className: cn("cn-dialog-description", className),
		...props
	});
}
//#endregion
//#region src/components/ui/command.tsx
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command, {
		"data-slot": "command",
		className: cn("cn-command flex size-full flex-col overflow-hidden", className),
		...props
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "command-input-wrapper",
		className: "cn-command-input-wrapper",
		children: /* @__PURE__ */ jsxs(InputGroup, {
			className: "cn-command-input-group",
			children: [/* @__PURE__ */ jsx(Command.Input, {
				"data-slot": "command-input",
				className: cn("cn-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className),
				...props
			}), /* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "SearchIcon",
				tabler: "IconSearch",
				hugeicons: "SearchIcon",
				phosphor: "MagnifyingGlassIcon",
				remixicon: "RiSearchLine",
				className: "cn-command-input-icon"
			}) })]
		})
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.List, {
		"data-slot": "command-list",
		className: cn("cn-command-list overflow-x-hidden overflow-y-auto", className),
		...props
	});
}
function CommandEmpty({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Empty, {
		"data-slot": "command-empty",
		className: cn("cn-command-empty", className),
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Group, {
		"data-slot": "command-group",
		className: cn("cn-command-group", className),
		...props
	});
}
function CommandSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Separator, {
		"data-slot": "command-separator",
		className: cn("cn-command-separator", className),
		...props
	});
}
function CommandItem({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Command.Item, {
		"data-slot": "command-item",
		className: cn("cn-command-item group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "CheckIcon",
			tabler: "IconCheck",
			hugeicons: "Tick02Icon",
			phosphor: "CheckIcon",
			remixicon: "RiCheckLine",
			className: "cn-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100"
		})]
	});
}
function CommandShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "command-shortcut",
		className: cn("cn-command-shortcut", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/command.tsx
var command_exports = /* @__PURE__ */ __exportAll({ default: () => CommandDemo });
function CommandDemo() {
	return /* @__PURE__ */ jsxs(Command$1, {
		className: "glass bg-glass w-full max-w-md rounded-3xl border",
		children: [/* @__PURE__ */ jsx(CommandInput, { placeholder: "Search or run a command" }), /* @__PURE__ */ jsxs(CommandList, { children: [
			/* @__PURE__ */ jsx(CommandEmpty, { children: "Nothing matches. Try an agent or page name." }),
			/* @__PURE__ */ jsxs(CommandGroup, {
				heading: "Agents",
				children: [
					/* @__PURE__ */ jsxs(CommandItem, { children: [/* @__PURE__ */ jsx(BotIcon, {}), /* @__PURE__ */ jsx("span", { children: "Run Proposal writer" })] }),
					/* @__PURE__ */ jsxs(CommandItem, { children: [/* @__PURE__ */ jsx(FileTextIcon, {}), /* @__PURE__ */ jsx("span", { children: "Summarise a document" })] }),
					/* @__PURE__ */ jsxs(CommandItem, { children: [/* @__PURE__ */ jsx(CalendarIcon, {}), /* @__PURE__ */ jsx("span", { children: "Prepare tomorrow's meetings" })] })
				]
			}),
			/* @__PURE__ */ jsx(CommandSeparator, {}),
			/* @__PURE__ */ jsxs(CommandGroup, {
				heading: "Settings",
				children: [
					/* @__PURE__ */ jsxs(CommandItem, { children: [
						/* @__PURE__ */ jsx(UserIcon, {}),
						/* @__PURE__ */ jsx("span", { children: "Profile" }),
						/* @__PURE__ */ jsx(CommandShortcut, { children: "⌘P" })
					] }),
					/* @__PURE__ */ jsxs(CommandItem, { children: [
						/* @__PURE__ */ jsx(CreditCardIcon, {}),
						/* @__PURE__ */ jsx("span", { children: "Billing" }),
						/* @__PURE__ */ jsx(CommandShortcut, { children: "⌘B" })
					] }),
					/* @__PURE__ */ jsxs(CommandItem, { children: [
						/* @__PURE__ */ jsx(SettingsIcon, {}),
						/* @__PURE__ */ jsx("span", { children: "Workspace settings" }),
						/* @__PURE__ */ jsx(CommandShortcut, { children: "⌘," })
					] })
				]
			})
		] })]
	});
}
//#endregion
//#region src/components/ui/context-menu.tsx
function ContextMenu$1({ ...props }) {
	return /* @__PURE__ */ jsx(ContextMenu.Root, {
		"data-slot": "context-menu",
		...props
	});
}
function ContextMenuTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(ContextMenu.Trigger, {
		"data-slot": "context-menu-trigger",
		className: cn("cn-context-menu-trigger select-none", className),
		...props
	});
}
function ContextMenuContent({ className, align = "start", alignOffset = 4, side = "right", sideOffset = 0, ...props }) {
	return /* @__PURE__ */ jsx(ContextMenu.Portal, { children: /* @__PURE__ */ jsx(ContextMenu.Positioner, {
		className: "isolate z-50 outline-none",
		align,
		alignOffset,
		side,
		sideOffset,
		children: /* @__PURE__ */ jsx(ContextMenu.Popup, {
			"data-slot": "context-menu-content",
			className: cn("cn-context-menu-content cn-context-menu-content-logical cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none", className),
			...props
		})
	}) });
}
function ContextMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(ContextMenu.Item, {
		"data-slot": "context-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("cn-context-menu-item group/context-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props
	});
}
function ContextMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(ContextMenu.Separator, {
		"data-slot": "context-menu-separator",
		className: cn("cn-context-menu-separator", className),
		...props
	});
}
function ContextMenuShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "context-menu-shortcut",
		className: cn("cn-context-menu-shortcut", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/context-menu.tsx
var context_menu_exports = /* @__PURE__ */ __exportAll({ default: () => ContextMenuDemo });
function ContextMenuDemo() {
	return /* @__PURE__ */ jsxs(ContextMenu$1, { children: [/* @__PURE__ */ jsx(ContextMenuTrigger, {
		className: "glass flex h-44 w-full max-w-sm items-center justify-center rounded-3xl border border-dashed text-sm",
		children: "Right-click or long-press here"
	}), /* @__PURE__ */ jsxs(ContextMenuContent, {
		className: "w-56",
		children: [
			/* @__PURE__ */ jsxs(ContextMenuItem, { children: ["Open", /* @__PURE__ */ jsx(ContextMenuShortcut, { children: "↵" })] }),
			/* @__PURE__ */ jsxs(ContextMenuItem, { children: ["Duplicate", /* @__PURE__ */ jsx(ContextMenuShortcut, { children: "⌘D" })] }),
			/* @__PURE__ */ jsx(ContextMenuItem, { children: "Copy link" }),
			/* @__PURE__ */ jsx(ContextMenuSeparator, {}),
			/* @__PURE__ */ jsx(ContextMenuItem, {
				variant: "destructive",
				children: "Delete"
			})
		]
	})] });
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.Root, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }) {
	return /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, {
		className: "isolate z-50 outline-none",
		align,
		alignOffset,
		side,
		sideOffset,
		children: /* @__PURE__ */ jsx(Menu.Popup, {
			"data-slot": "dropdown-menu-content",
			className: cn("cn-dropdown-menu-content cn-dropdown-menu-content-logical cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden", className),
			...props
		})
	}) });
}
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.Group, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuLabel({ className, inset, ...props }) {
	return /* @__PURE__ */ jsx(Menu.GroupLabel, {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		className: cn("cn-dropdown-menu-label", className),
		...props
	});
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(Menu.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("cn-dropdown-menu-item group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props
	});
}
function DropdownMenuSub({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.SubmenuRoot, {
		"data-slot": "dropdown-menu-sub",
		...props
	});
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
	return /* @__PURE__ */ jsxs(Menu.SubmenuTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": inset,
		className: cn("cn-dropdown-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronRightIcon",
			tabler: "IconChevronRight",
			hugeicons: "ArrowRight01Icon",
			phosphor: "CaretRightIcon",
			remixicon: "RiArrowRightSLine",
			className: "cn-rtl-flip ml-auto"
		})]
	});
}
function DropdownMenuSubContent({ align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: cn("cn-dropdown-menu-sub-content cn-menu-target cn-menu-translucent w-auto", className),
		align,
		alignOffset,
		side,
		sideOffset,
		...props
	});
}
function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }) {
	return /* @__PURE__ */ jsxs(Menu.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		"data-inset": inset,
		className: cn("cn-dropdown-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		checked,
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "cn-dropdown-menu-item-indicator pointer-events-none",
			"data-slot": "dropdown-menu-checkbox-item-indicator",
			children: /* @__PURE__ */ jsx(Menu.CheckboxItemIndicator, { children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "CheckIcon",
				tabler: "IconCheck",
				hugeicons: "Tick02Icon",
				phosphor: "CheckIcon",
				remixicon: "RiCheckLine"
			}) })
		}), children]
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Menu.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("cn-dropdown-menu-separator", className),
		...props
	});
}
function DropdownMenuShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: cn("cn-dropdown-menu-shortcut", className),
		...props
	});
}
//#endregion
//#region src/components/ui/table.tsx
function Table({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "table-container",
		className: "cn-table-container",
		children: /* @__PURE__ */ jsx("table", {
			"data-slot": "table",
			className: cn("cn-table", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("thead", {
		"data-slot": "table-header",
		className: cn("cn-table-header", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ jsx("tbody", {
		"data-slot": "table-body",
		className: cn("cn-table-body", className),
		...props
	});
}
function TableFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("tfoot", {
		"data-slot": "table-footer",
		className: cn("cn-table-footer", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ jsx("tr", {
		"data-slot": "table-row",
		className: cn("cn-table-row has-aria-expanded:bg-muted/50", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ jsx("th", {
		"data-slot": "table-head",
		className: cn("cn-table-head", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ jsx("td", {
		"data-slot": "table-cell",
		className: cn("cn-table-cell", className),
		...props
	});
}
function TableCaption({ className, ...props }) {
	return /* @__PURE__ */ jsx("caption", {
		"data-slot": "table-caption",
		className: cn("cn-table-caption", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/data-table.tsx
var data_table_exports = /* @__PURE__ */ __exportAll({ default: () => DataTableDemo });
var runs = [
	{
		id: "r-1042",
		agent: "Proposal writer",
		status: "Done",
		tokens: 18240
	},
	{
		id: "r-1041",
		agent: "Meeting summariser",
		status: "Running",
		tokens: 6120
	},
	{
		id: "r-1040",
		agent: "Contract reviewer",
		status: "Failed",
		tokens: 2310
	},
	{
		id: "r-1039",
		agent: "Pricing assistant",
		status: "Done",
		tokens: 9480
	},
	{
		id: "r-1038",
		agent: "Support triage",
		status: "Done",
		tokens: 4120
	}
];
var tone = {
	Done: "secondary",
	Running: "glass",
	Failed: "destructive"
};
function DataTableDemo() {
	const [desc, setDesc] = React.useState(true);
	const [selected, setSelected] = React.useState([]);
	const rows = [...runs].sort((a, b) => desc ? b.tokens - a.tokens : a.tokens - b.tokens);
	const all = selected.length === rows.length;
	return /* @__PURE__ */ jsx(Card, {
		variant: "glass",
		className: "w-full max-w-2xl gap-0 overflow-x-auto p-2",
		children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
			/* @__PURE__ */ jsx(TableHead, {
				className: "w-10",
				children: /* @__PURE__ */ jsx(Checkbox$1, {
					"aria-label": "Select all runs",
					checked: all,
					indeterminate: selected.length > 0 && !all,
					onCheckedChange: (c) => setSelected(c ? rows.map((r) => r.id) : [])
				})
			}),
			/* @__PURE__ */ jsx(TableHead, { children: "Agent" }),
			/* @__PURE__ */ jsx(TableHead, { children: "Status" }),
			/* @__PURE__ */ jsx(TableHead, {
				className: "text-right",
				children: /* @__PURE__ */ jsxs(Button$1, {
					variant: "ghost",
					size: "sm",
					onClick: () => setDesc((d) => !d),
					className: "-mr-2",
					children: ["Tokens", /* @__PURE__ */ jsx(ArrowUpDownIcon, { "data-icon": "inline-end" })]
				})
			}),
			/* @__PURE__ */ jsx(TableHead, { className: "w-10" })
		] }) }), /* @__PURE__ */ jsx(TableBody, { children: rows.map((r) => /* @__PURE__ */ jsxs(TableRow, {
			"data-state": selected.includes(r.id) ? "selected" : void 0,
			children: [
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Checkbox$1, {
					"aria-label": `Select ${r.id}`,
					checked: selected.includes(r.id),
					onCheckedChange: (c) => setSelected((s) => c ? [...s, r.id] : s.filter((x) => x !== r.id))
				}) }),
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: r.agent
					}), /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground font-mono text-xs",
						children: r.id
					})]
				}) }),
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, {
					variant: tone[r.status],
					children: r.status
				}) }),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right tabular-nums",
					children: r.tokens.toLocaleString()
				}),
				/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					render: /* @__PURE__ */ jsx(Button$1, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": `Actions for ${r.id}`
					}),
					children: /* @__PURE__ */ jsx(MoreHorizontalIcon, {})
				}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ jsx(DropdownMenuItem, { children: "Open run" }),
						/* @__PURE__ */ jsx(DropdownMenuItem, { children: "Re-run" }),
						/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							variant: "destructive",
							children: "Delete run"
						})
					]
				})] }) })
			]
		}, r.id)) })] })
	});
}
//#endregion
//#region src/components/ui/popover.tsx
function Popover$1({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Root, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Positioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ jsx(Popover.Popup, {
			"data-slot": "popover-content",
			className: cn("cn-popover-content cn-popover-content-logical z-50 w-72 origin-(--transform-origin) outline-hidden", className),
			...props
		})
	}) });
}
function PopoverHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "popover-header",
		className: cn("cn-popover-header", className),
		...props
	});
}
function PopoverTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Popover.Title, {
		"data-slot": "popover-title",
		className: cn("cn-popover-title", className),
		...props
	});
}
function PopoverDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Popover.Description, {
		"data-slot": "popover-description",
		className: cn("cn-popover-description", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/date-picker.tsx
var date_picker_exports = /* @__PURE__ */ __exportAll({ default: () => DatePickerDemo });
function DatePickerDemo() {
	const [date, setDate] = React.useState();
	return /* @__PURE__ */ jsxs(Field, {
		className: "w-full max-w-60",
		children: [/* @__PURE__ */ jsx(FieldLabel, {
			htmlFor: "dp-due",
			children: "Review due"
		}), /* @__PURE__ */ jsxs(Popover$1, { children: [/* @__PURE__ */ jsxs(PopoverTrigger, {
			render: /* @__PURE__ */ jsx(Button$1, {
				id: "dp-due",
				variant: "outline",
				className: "justify-start font-normal"
			}),
			children: [/* @__PURE__ */ jsx(CalendarIcon, { "data-icon": "inline-start" }), date ? format(date, "EEE d MMM yyyy") : /* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: "Pick a date"
			})]
		}), /* @__PURE__ */ jsx(PopoverContent, {
			className: "w-auto p-2",
			align: "start",
			children: /* @__PURE__ */ jsx(Calendar, {
				mode: "single",
				selected: date,
				onSelect: setDate,
				defaultMonth: new Date(2026, 9, 1)
			})
		})] })]
	});
}
//#endregion
//#region src/docs/demos/dialog.tsx
var dialog_exports = /* @__PURE__ */ __exportAll({ default: () => DialogDemo });
function DialogDemo() {
	return /* @__PURE__ */ jsxs(Dialog$1, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "glass" }),
		children: "Rename agent"
	}), /* @__PURE__ */ jsxs(DialogContent, {
		className: "sm:max-w-md",
		children: [
			/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Rename agent" }), /* @__PURE__ */ jsx(DialogDescription, { children: "People in this workspace see the new name right away." })] }),
			/* @__PURE__ */ jsxs(FieldGroup, { children: [/* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsx(FieldLabel, {
				htmlFor: "dlg-name",
				children: "Name"
			}), /* @__PURE__ */ jsx(Input$1, {
				id: "dlg-name",
				defaultValue: "Proposal writer"
			})] }), /* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsx(FieldLabel, {
				htmlFor: "dlg-desc",
				children: "Description"
			}), /* @__PURE__ */ jsx(Textarea, {
				id: "dlg-desc",
				defaultValue: "Drafts client proposals from discovery notes and past wins."
			})] })] }),
			/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(DialogClose, {
				render: /* @__PURE__ */ jsx(Button$1, { variant: "outline" }),
				children: "Cancel"
			}), /* @__PURE__ */ jsx(Button$1, { children: "Save name" })] })
		]
	})] });
}
//#endregion
//#region src/components/ui/slider.tsx
function Slider$1({ className, defaultValue, value, min = 0, max = 100, ...props }) {
	const _values = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max];
	return /* @__PURE__ */ jsx(Slider.Root, {
		className: cn("data-horizontal:w-full data-vertical:h-full", className),
		"data-slot": "slider",
		defaultValue,
		value,
		min,
		max,
		thumbAlignment: "edge",
		...props,
		children: /* @__PURE__ */ jsxs(Slider.Control, {
			className: "cn-slider relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col",
			children: [/* @__PURE__ */ jsx(Slider.Track, {
				"data-slot": "slider-track",
				className: "cn-slider-track relative grow overflow-hidden select-none",
				children: /* @__PURE__ */ jsx(Slider.Indicator, {
					"data-slot": "slider-range",
					className: "cn-slider-range select-none data-horizontal:h-full data-vertical:w-full"
				})
			}), Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx(Slider.Thumb, {
				"data-slot": "slider-thumb",
				className: "cn-slider-thumb block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
			}, index))]
		})
	});
}
//#endregion
//#region src/docs/demos/direction.tsx
var direction_exports = /* @__PURE__ */ __exportAll({ default: () => DirectionDemo });
function DirectionDemo() {
	return /* @__PURE__ */ jsx(DirectionProvider, {
		direction: "rtl",
		children: /* @__PURE__ */ jsx("div", {
			dir: "rtl",
			lang: "ar",
			className: "w-full max-w-sm",
			children: /* @__PURE__ */ jsxs(Card, {
				variant: "glass",
				children: [
					/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "الميزانية الشهرية" }), /* @__PURE__ */ jsx(CardDescription, { children: "تتوقف التشغيلات عند الوصول إلى الحد." })] }),
					/* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Slider$1, {
						defaultValue: [60],
						"aria-label": "الميزانية"
					}) }),
					/* @__PURE__ */ jsx(CardFooter, {
						className: "justify-end",
						children: /* @__PURE__ */ jsx(Button$1, { children: "حفظ" })
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/ui/drawer.tsx
var DrawerContext = React.createContext(null);
function useDrawer() {
	const context = React.useContext(DrawerContext);
	if (!context) throw new Error("useDrawer must be used within a Drawer.");
	return context;
}
function Drawer$1({ modal = true, showSwipeHandle = false, snapPoints, swipeDirection = "down", ...props }) {
	const hasSnapPoints = snapPoints != null && snapPoints.length > 0;
	const contextValue = React.useMemo(() => ({
		hasSnapPoints,
		modal,
		showSwipeHandle,
		swipeDirection
	}), [
		hasSnapPoints,
		modal,
		showSwipeHandle,
		swipeDirection
	]);
	return /* @__PURE__ */ jsx(DrawerContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx(Drawer.Root, {
			"data-slot": "drawer",
			modal,
			snapPoints,
			swipeDirection,
			...props
		})
	});
}
function DrawerTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Drawer.Trigger, {
		"data-slot": "drawer-trigger",
		...props
	});
}
function DrawerPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Drawer.Portal, {
		"data-slot": "drawer-portal",
		...props
	});
}
function DrawerClose({ ...props }) {
	return /* @__PURE__ */ jsx(Drawer.Close, {
		"data-slot": "drawer-close",
		...props
	});
}
function DrawerOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Drawer.Backdrop, {
		"data-slot": "drawer-overlay",
		className: cn("cn-drawer-overlay fixed inset-0 z-50 min-h-dvh opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute", className),
		...props
	});
}
function DrawerSwipeHandle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "drawer-swipe-handle",
		"aria-hidden": "true",
		className: cn("cn-drawer-swipe-handle relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:order-last active:cursor-grabbing", className),
		...props
	});
}
function DrawerContent({ className, children, ...props }) {
	const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer();
	const swipeAxis = swipeDirection === "down" || swipeDirection === "up" ? "y" : "x";
	return /* @__PURE__ */ jsxs(DrawerPortal, {
		"data-slot": "drawer-portal",
		children: [modal === true && /* @__PURE__ */ jsx(DrawerOverlay, { "data-snap-points": hasSnapPoints ? "" : void 0 }), /* @__PURE__ */ jsx(Drawer.Viewport, {
			"data-slot": "drawer-viewport",
			"data-modal": modal,
			className: "pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto",
			children: /* @__PURE__ */ jsxs(Drawer.Popup, {
				"data-slot": "drawer-popup",
				"data-swipe-axis": swipeAxis,
				"data-snap-points": hasSnapPoints ? "" : void 0,
				className: cn("cn-drawer-popup group/drawer-popup pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] flex-col transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords]", "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95", "after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:after:bottom-full", "[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]", "[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]", "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]", "data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)", "data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row", "data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]", "data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]", "data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]", "data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]", className),
				...props,
				children: [showSwipeHandle && /* @__PURE__ */ jsx(DrawerSwipeHandle, {}), /* @__PURE__ */ jsx(Drawer.Content, {
					"data-slot": "drawer-content",
					className: cn("cn-drawer-content-base flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none"),
					children
				})]
			})
		})]
	});
}
function DrawerHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "drawer-header",
		className: cn("cn-drawer-header-base flex shrink-0 flex-col group-data-[swipe-axis=y]/drawer-popup:text-center", className),
		...props
	});
}
function DrawerFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "drawer-footer",
		className: cn("cn-drawer-footer-base mt-auto flex shrink-0 flex-col", className),
		...props
	});
}
function DrawerTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Drawer.Title, {
		"data-slot": "drawer-title",
		className: cn("cn-drawer-title cn-font-heading", className),
		...props
	});
}
function DrawerDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Drawer.Description, {
		"data-slot": "drawer-description",
		className: cn("cn-drawer-description text-balance", className),
		...props
	});
}
//#endregion
//#region src/components/ui/progress.tsx
function Progress$1({ className, children, value, ...props }) {
	return /* @__PURE__ */ jsxs(Progress.Root, {
		value,
		"data-slot": "progress",
		className: cn("cn-progress-root flex flex-wrap gap-3", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ProgressTrack, { children: /* @__PURE__ */ jsx(ProgressIndicator, {}) })]
	});
}
function ProgressTrack({ className, ...props }) {
	return /* @__PURE__ */ jsx(Progress.Track, {
		className: cn("cn-progress-track relative flex w-full items-center overflow-x-hidden", className),
		"data-slot": "progress-track",
		...props
	});
}
function ProgressIndicator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Progress.Indicator, {
		"data-slot": "progress-indicator",
		className: cn("cn-progress-indicator h-full transition-all", className),
		...props
	});
}
function ProgressLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(Progress.Label, {
		className: cn("cn-progress-label", className),
		"data-slot": "progress-label",
		...props
	});
}
function ProgressValue({ className, ...props }) {
	return /* @__PURE__ */ jsx(Progress.Value, {
		className: cn("cn-progress-value", className),
		"data-slot": "progress-value",
		...props
	});
}
//#endregion
//#region src/docs/demos/drawer.tsx
var drawer_exports = /* @__PURE__ */ __exportAll({ default: () => DrawerDemo });
function DrawerDemo() {
	return /* @__PURE__ */ jsxs(Drawer$1, { children: [/* @__PURE__ */ jsx(DrawerTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "glass" }),
		children: "View run details"
	}), /* @__PURE__ */ jsx(DrawerContent, { children: /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-sm",
		children: [
			/* @__PURE__ */ jsxs(DrawerHeader, { children: [/* @__PURE__ */ jsx(DrawerTitle, { children: "Run r-1041" }), /* @__PURE__ */ jsx(DrawerDescription, { children: "Meeting summariser, started 4 minutes ago." })] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-2 px-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "Transcribing"
					}), /* @__PURE__ */ jsx("span", {
						className: "font-medium tabular-nums",
						children: "72%"
					})]
				}), /* @__PURE__ */ jsx(Progress$1, {
					value: 72,
					"aria-label": "Run progress"
				})]
			}),
			/* @__PURE__ */ jsxs(DrawerFooter, { children: [/* @__PURE__ */ jsx(Button$1, { children: "Open transcript" }), /* @__PURE__ */ jsx(DrawerClose, {
				render: /* @__PURE__ */ jsx(Button$1, { variant: "outline" }),
				children: "Close"
			})] })
		]
	}) })] });
}
//#endregion
//#region src/docs/demos/dropdown-menu.tsx
var dropdown_menu_exports = /* @__PURE__ */ __exportAll({ default: () => DropdownMenuDemo });
function DropdownMenuDemo() {
	const [pinned, setPinned] = React.useState(true);
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "glass" }),
		children: "Agent actions"
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		className: "w-56",
		children: [
			/* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
				/* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Proposal writer" }),
				/* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
					/* @__PURE__ */ jsx(PencilIcon, {}),
					"Rename",
					/* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⌘R" })
				] }),
				/* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
					/* @__PURE__ */ jsx(CopyIcon, {}),
					"Duplicate",
					/* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⌘D" })
				] }),
				/* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ jsx(ShareIcon, {}), "Share with"] }), /* @__PURE__ */ jsxs(DropdownMenuSubContent, { children: [
					/* @__PURE__ */ jsx(DropdownMenuItem, { children: "Sales team" }),
					/* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delivery team" }),
					/* @__PURE__ */ jsx(DropdownMenuItem, { children: "A client workspace" })
				] })] })
			] }),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsx(DropdownMenuCheckboxItem, {
				checked: pinned,
				onCheckedChange: setPinned,
				children: "Pin to sidebar"
			}),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsxs(DropdownMenuItem, {
				variant: "destructive",
				children: [/* @__PURE__ */ jsx(Trash2Icon, {}), "Delete"]
			})
		]
	})] });
}
//#endregion
//#region src/components/ui/empty.tsx
function Empty({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "empty",
		className: cn("cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance", className),
		...props
	});
}
function EmptyHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "empty-header",
		className: cn("cn-empty-header flex max-w-sm flex-col items-center", className),
		...props
	});
}
var emptyMediaVariants = cva("cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: { variant: {
		default: "cn-empty-media-default",
		icon: "cn-empty-media-icon"
	} },
	defaultVariants: { variant: "default" }
});
function EmptyMedia({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "empty-icon",
		"data-variant": variant,
		className: cn(emptyMediaVariants({
			variant,
			className
		})),
		...props
	});
}
function EmptyTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "empty-title",
		className: cn("cn-empty-title cn-font-heading", className),
		...props
	});
}
function EmptyDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "empty-description",
		className: cn("cn-empty-description text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
function EmptyContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "empty-content",
		className: cn("cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center text-balance", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/empty.tsx
var empty_exports = /* @__PURE__ */ __exportAll({ default: () => EmptyDemo });
function EmptyDemo() {
	return /* @__PURE__ */ jsxs(Empty, {
		className: "glass w-full max-w-md rounded-3xl border",
		children: [/* @__PURE__ */ jsxs(EmptyHeader, { children: [
			/* @__PURE__ */ jsx(EmptyMedia, {
				variant: "icon",
				children: /* @__PURE__ */ jsx(BotIcon, {})
			}),
			/* @__PURE__ */ jsx(EmptyTitle, { children: "No agents in this workspace yet" }),
			/* @__PURE__ */ jsx(EmptyDescription, { children: "Start from a template or bring one over from another workspace." })
		] }), /* @__PURE__ */ jsxs(EmptyContent, {
			className: "flex-row justify-center gap-2",
			children: [/* @__PURE__ */ jsx(Button$1, { children: "Browse templates" }), /* @__PURE__ */ jsx(Button$1, {
				variant: "outline",
				children: "Import an agent"
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/switch.tsx
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Switch.Root, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("cn-switch peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(Switch.Thumb, {
			"data-slot": "switch-thumb",
			className: "cn-switch-thumb pointer-events-none block ring-0 transition-transform"
		})
	});
}
//#endregion
//#region src/docs/demos/field.tsx
var field_exports = /* @__PURE__ */ __exportAll({ default: () => FieldDemo });
function FieldDemo() {
	return /* @__PURE__ */ jsx(Card, {
		variant: "glass",
		className: "w-full max-w-md p-6",
		children: /* @__PURE__ */ jsx("form", {
			onSubmit: (e) => e.preventDefault(),
			children: /* @__PURE__ */ jsxs(FieldSet, { children: [
				/* @__PURE__ */ jsx(FieldLegend, { children: "New workspace" }),
				/* @__PURE__ */ jsx(FieldDescription, { children: "You can change all of this later in Settings." }),
				/* @__PURE__ */ jsxs(FieldGroup, { children: [
					/* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsx(FieldLabel, {
						htmlFor: "f-name",
						children: "Workspace name"
					}), /* @__PURE__ */ jsx(Input$1, {
						id: "f-name",
						placeholder: "e.g. Retail delivery"
					})] }),
					/* @__PURE__ */ jsxs(Field, {
						"data-invalid": true,
						children: [
							/* @__PURE__ */ jsx(FieldLabel, {
								htmlFor: "f-slug",
								children: "Web address"
							}),
							/* @__PURE__ */ jsx(Input$1, {
								id: "f-slug",
								defaultValue: "retail delivery",
								"aria-invalid": true
							}),
							/* @__PURE__ */ jsx(FieldError, { children: "Use lowercase letters, numbers and dashes only, like retail-delivery." })
						]
					}),
					/* @__PURE__ */ jsx(FieldSeparator, {}),
					/* @__PURE__ */ jsxs(Field, {
						orientation: "horizontal",
						children: [/* @__PURE__ */ jsx(FieldLabel, {
							htmlFor: "f-public",
							children: "Visible to everyone in the company"
						}), /* @__PURE__ */ jsx(Switch$1, {
							id: "f-public",
							defaultChecked: true
						})]
					}),
					/* @__PURE__ */ jsx(Button$1, {
						type: "submit",
						className: "self-end",
						children: "Create workspace"
					})
				] })
			] })
		})
	});
}
//#endregion
//#region src/components/ui/hover-card.tsx
function HoverCard({ ...props }) {
	return /* @__PURE__ */ jsx(PreviewCard.Root, {
		"data-slot": "hover-card",
		...props
	});
}
function HoverCardTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(PreviewCard.Trigger, {
		"data-slot": "hover-card-trigger",
		...props
	});
}
function HoverCardContent({ className, side = "bottom", sideOffset = 4, align = "center", alignOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(PreviewCard.Portal, {
		"data-slot": "hover-card-portal",
		children: /* @__PURE__ */ jsx(PreviewCard.Positioner, {
			align,
			alignOffset,
			side,
			sideOffset,
			className: "isolate z-50",
			children: /* @__PURE__ */ jsx(PreviewCard.Popup, {
				"data-slot": "hover-card-content",
				className: cn("cn-hover-card-content cn-hover-card-content-logical z-50 origin-(--transform-origin) outline-hidden", className),
				...props
			})
		})
	});
}
//#endregion
//#region src/docs/demos/hover-card.tsx
var hover_card_exports = /* @__PURE__ */ __exportAll({ default: () => HoverCardDemo });
function HoverCardDemo() {
	return /* @__PURE__ */ jsxs(HoverCard, { children: [/* @__PURE__ */ jsx(HoverCardTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "link" }),
		children: "@sam.wong"
	}), /* @__PURE__ */ jsx(HoverCardContent, {
		className: "w-72",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ jsx(Avatar$1, {
				size: "lg",
				children: /* @__PURE__ */ jsx(AvatarFallback, { children: "SW" })
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-semibold",
						children: "Sam Wong"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground text-sm",
						children: "Strategy lead, agentic AI. Owns 6 agents in this workspace."
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground text-xs",
						children: "Joined March 2025"
					})
				]
			})]
		})
	})] });
}
//#endregion
//#region src/components/ui/kbd.tsx
function Kbd({ className, ...props }) {
	return /* @__PURE__ */ jsx("kbd", {
		"data-slot": "kbd",
		className: cn("cn-kbd pointer-events-none inline-flex items-center justify-center select-none", className),
		...props
	});
}
function KbdGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("kbd", {
		"data-slot": "kbd-group",
		className: cn("cn-kbd-group inline-flex items-center", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/input-group.tsx
var input_group_exports = /* @__PURE__ */ __exportAll({ default: () => InputGroupDemo });
function InputGroupDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-md flex-col gap-6",
		children: [
			/* @__PURE__ */ jsxs(InputGroup, { children: [
				/* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(SearchIcon, {}) }),
				/* @__PURE__ */ jsx(InputGroupInput, {
					placeholder: "Search agents",
					"aria-label": "Search agents"
				}),
				/* @__PURE__ */ jsx(InputGroupAddon, {
					align: "inline-end",
					children: /* @__PURE__ */ jsx(Kbd, { children: "⌘K" })
				})
			] }),
			/* @__PURE__ */ jsxs(InputGroup, { children: [
				/* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(InputGroupText, { children: "https://" }) }),
				/* @__PURE__ */ jsx(InputGroupInput, {
					placeholder: "your-workspace",
					"aria-label": "Workspace address"
				}),
				/* @__PURE__ */ jsx(InputGroupAddon, {
					align: "inline-end",
					children: /* @__PURE__ */ jsx(InputGroupText, { children: ".agents.app" })
				})
			] }),
			/* @__PURE__ */ jsxs(InputGroup, {
				className: "glass bg-glass rounded-3xl",
				children: [/* @__PURE__ */ jsx(InputGroupTextarea, {
					placeholder: "Ask the agent anything",
					"aria-label": "Message",
					className: "min-h-20"
				}), /* @__PURE__ */ jsxs(InputGroupAddon, {
					align: "block-end",
					children: [/* @__PURE__ */ jsx(InputGroupButton, {
						size: "icon-sm",
						variant: "ghost",
						"aria-label": "Attach a file",
						children: /* @__PURE__ */ jsx(PaperclipIcon, {})
					}), /* @__PURE__ */ jsx(InputGroupButton, {
						size: "icon-sm",
						variant: "default",
						className: "ml-auto rounded-full",
						"aria-label": "Send",
						children: /* @__PURE__ */ jsx(ArrowUpIcon, {})
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ui/input-otp.tsx
function InputOTP({ className, containerClassName, ...props }) {
	return /* @__PURE__ */ jsx(OTPInput, {
		"data-slot": "input-otp",
		containerClassName: cn("cn-input-otp flex items-center has-disabled:opacity-50", containerClassName),
		spellCheck: false,
		className: cn("cn-input-otp-input disabled:cursor-not-allowed", className),
		...props
	});
}
function InputOTPGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "input-otp-group",
		className: cn("cn-input-otp-group flex items-center", className),
		...props
	});
}
function InputOTPSlot({ index, className, ...props }) {
	const { char, hasFakeCaret, isActive } = React.useContext(OTPInputContext)?.slots[index] ?? {};
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "input-otp-slot",
		"data-active": isActive,
		className: cn("cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ jsx("div", {
			className: "cn-input-otp-caret pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ jsx("div", { className: "cn-input-otp-caret-line" })
		})]
	});
}
function InputOTPSeparator({ ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "input-otp-separator",
		className: "cn-input-otp-separator flex items-center",
		role: "separator",
		...props,
		children: /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "MinusIcon",
			tabler: "IconMinus",
			hugeicons: "MinusSignIcon",
			phosphor: "MinusIcon",
			remixicon: "RiSubtractLine"
		})
	});
}
//#endregion
//#region src/docs/demos/input-otp.tsx
var input_otp_exports = /* @__PURE__ */ __exportAll({ default: () => InputOTPDemo });
function InputOTPDemo() {
	return /* @__PURE__ */ jsxs(Field, {
		className: "w-fit",
		children: [
			/* @__PURE__ */ jsx(FieldLabel, {
				htmlFor: "otp",
				children: "Verification code"
			}),
			/* @__PURE__ */ jsxs(InputOTP, {
				id: "otp",
				maxLength: 6,
				children: [
					/* @__PURE__ */ jsxs(InputOTPGroup, { children: [
						/* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
						/* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
						/* @__PURE__ */ jsx(InputOTPSlot, { index: 2 })
					] }),
					/* @__PURE__ */ jsx(InputOTPSeparator, {}),
					/* @__PURE__ */ jsxs(InputOTPGroup, { children: [
						/* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
						/* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
						/* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
					] })
				]
			}),
			/* @__PURE__ */ jsx(FieldDescription, { children: "Sent to the phone ending 4417." })
		]
	});
}
//#endregion
//#region src/docs/demos/input.tsx
var input_exports = /* @__PURE__ */ __exportAll({ default: () => InputDemo });
function InputDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-sm flex-col gap-6",
		children: [
			/* @__PURE__ */ jsxs(Field, { children: [
				/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "in-email",
					children: "Work email"
				}),
				/* @__PURE__ */ jsx(Input$1, {
					id: "in-email",
					type: "email",
					placeholder: "name@company.com"
				}),
				/* @__PURE__ */ jsx(FieldDescription, { children: "We send run summaries here." })
			] }),
			/* @__PURE__ */ jsxs(Field, {
				"data-disabled": true,
				children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "in-region",
					children: "Data region"
				}), /* @__PURE__ */ jsx(Input$1, {
					id: "in-region",
					defaultValue: "Canada (Toronto)",
					disabled: true
				})]
			}),
			/* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsx(FieldLabel, {
				htmlFor: "in-file",
				children: "Upload notes"
			}), /* @__PURE__ */ jsx(Input$1, {
				id: "in-file",
				type: "file"
			})] })
		]
	});
}
//#endregion
//#region src/components/ui/item.tsx
function ItemGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "list",
		"data-slot": "item-group",
		className: cn("cn-item-group group/item-group flex w-full flex-col", className),
		...props
	});
}
function ItemSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Separator$1, {
		"data-slot": "item-separator",
		orientation: "horizontal",
		className: cn("cn-item-separator", className),
		...props
	});
}
var itemVariants = cva("cn-item group/item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors", {
	variants: {
		variant: {
			default: "cn-item-variant-default",
			outline: "cn-item-variant-outline",
			muted: "cn-item-variant-muted"
		},
		size: {
			default: "cn-item-size-default",
			sm: "cn-item-size-sm",
			xs: "cn-item-size-xs"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Item({ className, variant = "default", size = "default", render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn(itemVariants({
			variant,
			size,
			className
		})) }, props),
		render,
		state: {
			slot: "item",
			variant,
			size
		}
	});
}
var itemMediaVariants = cva("cn-item-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none", {
	variants: { variant: {
		default: "cn-item-media-variant-default",
		icon: "cn-item-media-variant-icon",
		image: "cn-item-media-variant-image"
	} },
	defaultVariants: { variant: "default" }
});
function ItemMedia({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "item-media",
		"data-variant": variant,
		className: cn(itemMediaVariants({
			variant,
			className
		})),
		...props
	});
}
function ItemContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "item-content",
		className: cn("cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none", className),
		...props
	});
}
function ItemTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "item-title",
		className: cn("cn-item-title line-clamp-1 flex w-fit items-center", className),
		...props
	});
}
function ItemDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("p", {
		"data-slot": "item-description",
		className: cn("cn-item-description line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
function ItemActions({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "item-actions",
		className: cn("cn-item-actions flex items-center", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/item.tsx
var item_exports = /* @__PURE__ */ __exportAll({ default: () => ItemDemo });
function ItemDemo() {
	return /* @__PURE__ */ jsxs(ItemGroup, {
		className: "glass w-full max-w-md rounded-3xl border p-2",
		children: [
			/* @__PURE__ */ jsxs(Item, { children: [
				/* @__PURE__ */ jsx(ItemMedia, {
					variant: "icon",
					children: /* @__PURE__ */ jsx(BotIcon, {})
				}),
				/* @__PURE__ */ jsxs(ItemContent, { children: [/* @__PURE__ */ jsx(ItemTitle, { children: "Proposal writer" }), /* @__PURE__ */ jsx(ItemDescription, { children: "Drafts client proposals from discovery notes." })] }),
				/* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Button$1, {
					size: "sm",
					variant: "outline",
					children: "Run"
				}) })
			] }),
			/* @__PURE__ */ jsx(ItemSeparator, {}),
			/* @__PURE__ */ jsxs(Item, {
				render: /* @__PURE__ */ jsx("a", { href: "#" }),
				children: [
					/* @__PURE__ */ jsx(ItemMedia, {
						variant: "icon",
						children: /* @__PURE__ */ jsx(FileTextIcon, {})
					}),
					/* @__PURE__ */ jsxs(ItemContent, { children: [/* @__PURE__ */ jsx(ItemTitle, { children: "Q4 retail proposal" }), /* @__PURE__ */ jsx(ItemDescription, { children: "Generated yesterday, 6 pages" })] }),
					/* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "size-4" }) })
				]
			})
		]
	});
}
//#endregion
//#region src/docs/demos/kbd.tsx
var kbd_exports = /* @__PURE__ */ __exportAll({ default: () => KbdDemo });
function KbdDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-4 text-sm",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "text-muted-foreground",
			children: [
				"Press",
				" ",
				/* @__PURE__ */ jsxs(KbdGroup, { children: [/* @__PURE__ */ jsx(Kbd, { children: "⌘" }), /* @__PURE__ */ jsx(Kbd, { children: "K" })] }),
				" ",
				"to search, or ",
				/* @__PURE__ */ jsx(Kbd, { children: "/" }),
				" to start a message."
			]
		}), /* @__PURE__ */ jsxs(KbdGroup, { children: [
			/* @__PURE__ */ jsx(Kbd, { children: "Shift" }),
			/* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: "+"
			}),
			/* @__PURE__ */ jsx(Kbd, { children: "Enter" })
		] })]
	});
}
//#endregion
//#region src/docs/demos/label.tsx
var label_exports = /* @__PURE__ */ __exportAll({ default: () => LabelDemo });
function LabelDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ jsx(Checkbox$1, {
			id: "lbl-notify",
			defaultChecked: true
		}), /* @__PURE__ */ jsx(Label, {
			htmlFor: "lbl-notify",
			children: "Email me when a run fails"
		})]
	});
}
//#endregion
//#region src/components/ui/marker.tsx
var markerVariants = cva("cn-marker group/marker relative flex w-full items-center", { variants: { variant: {
	default: "cn-marker-variant-default",
	separator: "cn-marker-variant-separator",
	border: "cn-marker-variant-border"
} } });
function Marker({ className, variant = "default", render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn(markerVariants({
			variant,
			className
		})) }, props),
		render,
		state: {
			slot: "marker",
			variant
		}
	});
}
function MarkerIcon({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "marker-icon",
		"aria-hidden": "true",
		className: cn("cn-marker-icon shrink-0", className),
		...props
	});
}
function MarkerContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "marker-content",
		className: cn("cn-marker-content min-w-0 wrap-break-word", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/marker.tsx
var marker_exports = /* @__PURE__ */ __exportAll({ default: () => MarkerDemo });
function MarkerDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "glass flex w-full max-w-sm flex-col gap-4 rounded-3xl border p-6",
		children: [
			/* @__PURE__ */ jsxs(Marker, { children: [/* @__PURE__ */ jsx(MarkerIcon, { children: /* @__PURE__ */ jsx(CheckIcon, {}) }), /* @__PURE__ */ jsx(MarkerContent, { children: "Read 4 discovery documents" })] }),
			/* @__PURE__ */ jsxs(Marker, { children: [/* @__PURE__ */ jsx(MarkerIcon, { children: /* @__PURE__ */ jsx(FileTextIcon, {}) }), /* @__PURE__ */ jsx(MarkerContent, { children: "Drafted a 6-page proposal" })] }),
			/* @__PURE__ */ jsxs(Marker, {
				role: "status",
				children: [/* @__PURE__ */ jsx(MarkerIcon, { children: /* @__PURE__ */ jsx(Spinner, {}) }), /* @__PURE__ */ jsx(MarkerContent, { children: "Checking pricing against the rate card" })]
			}),
			/* @__PURE__ */ jsxs(Marker, {
				render: /* @__PURE__ */ jsx("a", { href: "#" }),
				children: [/* @__PURE__ */ jsx(MarkerIcon, { children: /* @__PURE__ */ jsx(GitBranchIcon, {}) }), /* @__PURE__ */ jsx(MarkerContent, { children: "Compare with version 2" })]
			})
		]
	});
}
//#endregion
//#region src/components/ui/menubar.tsx
function Menubar$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Menubar, {
		"data-slot": "menubar",
		className: cn("cn-menubar flex items-center", className),
		...props
	});
}
function MenubarMenu({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenu, {
		"data-slot": "menubar-menu",
		...props
	});
}
function MenubarTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuTrigger, {
		"data-slot": "menubar-trigger",
		className: cn("cn-menubar-trigger flex items-center outline-hidden select-none", className),
		...props
	});
}
function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuContent, {
		"data-slot": "menubar-content",
		align,
		alignOffset,
		sideOffset,
		className: cn("cn-menubar-content cn-menubar-content-logical cn-menu-target cn-menu-translucent", className),
		...props
	});
}
function MenubarItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuItem, {
		"data-slot": "menubar-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("cn-menubar-item group/menubar-item", className),
		...props
	});
}
function MenubarCheckboxItem({ className, children, checked, inset, ...props }) {
	return /* @__PURE__ */ jsxs(Menu.CheckboxItem, {
		"data-slot": "menubar-checkbox-item",
		"data-inset": inset,
		className: cn("cn-menubar-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		checked,
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "cn-menubar-checkbox-item-indicator pointer-events-none absolute flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Menu.CheckboxItemIndicator, { children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "CheckIcon",
				tabler: "IconCheck",
				hugeicons: "Tick02Icon",
				phosphor: "CheckIcon",
				remixicon: "RiCheckLine"
			}) })
		}), children]
	});
}
function MenubarSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuSeparator, {
		"data-slot": "menubar-separator",
		className: cn("cn-menubar-separator -mx-1 my-1 h-px", className),
		...props
	});
}
function MenubarShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuShortcut, {
		"data-slot": "menubar-shortcut",
		className: cn("cn-menubar-shortcut ml-auto", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/menubar.tsx
var menubar_exports = /* @__PURE__ */ __exportAll({ default: () => MenubarDemo });
function MenubarDemo() {
	return /* @__PURE__ */ jsxs(Menubar$1, { children: [
		/* @__PURE__ */ jsxs(MenubarMenu, { children: [/* @__PURE__ */ jsx(MenubarTrigger, { children: "File" }), /* @__PURE__ */ jsxs(MenubarContent, { children: [
			/* @__PURE__ */ jsxs(MenubarItem, { children: ["New agent ", /* @__PURE__ */ jsx(MenubarShortcut, { children: "⌘N" })] }),
			/* @__PURE__ */ jsxs(MenubarItem, { children: ["Open ", /* @__PURE__ */ jsx(MenubarShortcut, { children: "⌘O" })] }),
			/* @__PURE__ */ jsx(MenubarSeparator, {}),
			/* @__PURE__ */ jsx(MenubarItem, { children: "Export as JSON" })
		] })] }),
		/* @__PURE__ */ jsxs(MenubarMenu, { children: [/* @__PURE__ */ jsx(MenubarTrigger, { children: "Edit" }), /* @__PURE__ */ jsxs(MenubarContent, { children: [/* @__PURE__ */ jsxs(MenubarItem, { children: ["Undo ", /* @__PURE__ */ jsx(MenubarShortcut, { children: "⌘Z" })] }), /* @__PURE__ */ jsxs(MenubarItem, { children: ["Redo ", /* @__PURE__ */ jsx(MenubarShortcut, { children: "⇧⌘Z" })] })] })] }),
		/* @__PURE__ */ jsxs(MenubarMenu, { children: [/* @__PURE__ */ jsx(MenubarTrigger, { children: "View" }), /* @__PURE__ */ jsxs(MenubarContent, { children: [/* @__PURE__ */ jsx(MenubarCheckboxItem, {
			defaultChecked: true,
			children: "Show run history"
		}), /* @__PURE__ */ jsx(MenubarCheckboxItem, { children: "Show token counts" })] })] })
	] });
}
//#endregion
//#region src/components/ui/message.tsx
function Message({ className, align = "start", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "message",
		"data-align": align,
		className: cn("cn-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse", className),
		...props
	});
}
function MessageAvatar({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "message-avatar",
		className: cn("cn-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted", className),
		...props
	});
}
function MessageContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "message-content",
		className: cn("cn-message-content flex w-full min-w-0 flex-col wrap-break-word", className),
		...props
	});
}
function MessageHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "message-header",
		className: cn("cn-message-header flex max-w-full min-w-0 items-center", className),
		...props
	});
}
function MessageFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "message-footer",
		className: cn("cn-message-footer flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end", className),
		...props
	});
}
//#endregion
//#region src/components/ui/message-scroller.tsx
function MessageScrollerProvider(props) {
	return /* @__PURE__ */ jsx(MessageScroller.Provider, { ...props });
}
function MessageScroller$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(MessageScroller.Root, {
		"data-slot": "message-scroller",
		className: cn("cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", className),
		...props
	});
}
function MessageScrollerViewport({ className, ...props }) {
	return /* @__PURE__ */ jsx(MessageScroller.Viewport, {
		"data-slot": "message-scroller-viewport",
		className: cn("cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible", className),
		...props
	});
}
function MessageScrollerContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(MessageScroller.Content, {
		"data-slot": "message-scroller-content",
		className: cn("cn-message-scroller-content flex h-max min-h-full flex-col", className),
		...props
	});
}
function MessageScrollerItem({ className, scrollAnchor = false, ...props }) {
	return /* @__PURE__ */ jsx(MessageScroller.Item, {
		"data-slot": "message-scroller-item",
		scrollAnchor,
		className: cn("cn-message-scroller-item min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]", className),
		...props
	});
}
function MessageScrollerButton({ direction = "end", className, children, render, variant = "secondary", size = "icon-sm", ...props }) {
	return /* @__PURE__ */ jsx(MessageScroller.Button, {
		"data-slot": "message-scroller-button",
		"data-direction": direction,
		"data-variant": variant,
		"data-size": size,
		direction,
		className: cn("cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180", className),
		render: render ?? /* @__PURE__ */ jsx(Button$1, {
			variant,
			size
		}),
		...props,
		children: children ?? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ArrowDownIcon",
			tabler: "IconArrowDown",
			hugeicons: "ArrowDown02Icon",
			phosphor: "ArrowDownIcon",
			remixicon: "RiArrowDownLine"
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: direction === "end" ? "Scroll to end" : "Scroll to start"
		})] })
	});
}
//#endregion
//#region src/docs/demos/message-scroller.tsx
var message_scroller_exports = /* @__PURE__ */ __exportAll({ default: () => MessageScrollerDemo });
var turns = [
	["user", "What changed in the pricing model?"],
	["agent", "Three things: the base rate went up 4%, the volume tiers moved, and support is now a separate line."],
	["user", "Which tier does the retail client fall into?"],
	["agent", "Tier 2. They are 1,200 seats, and tier 2 now starts at 1,000."],
	["user", "So their price goes down?"],
	["agent", "Slightly. About 2% lower once the new tier applies, before support."],
	["user", "Draft a note to them explaining it."],
	["agent", "Done. It leads with the lower price, then explains the separate support line in one sentence."]
];
function MessageScrollerDemo() {
	return /* @__PURE__ */ jsx(Card, {
		variant: "glass",
		className: "h-96 w-full max-w-md gap-0 p-0",
		children: /* @__PURE__ */ jsx(MessageScrollerProvider, { children: /* @__PURE__ */ jsxs(MessageScroller$1, {
			className: "h-full",
			children: [/* @__PURE__ */ jsx(MessageScrollerViewport, { children: /* @__PURE__ */ jsx(MessageScrollerContent, {
				className: "flex flex-col gap-5 p-5",
				children: turns.map(([who, text], i) => /* @__PURE__ */ jsx(MessageScrollerItem, {
					scrollAnchor: i === turns.length - 1,
					children: /* @__PURE__ */ jsx(Message, {
						align: who === "user" ? "end" : "start",
						children: /* @__PURE__ */ jsx(MessageContent, { children: /* @__PURE__ */ jsx(Bubble, {
							align: who === "user" ? "end" : "start",
							variant: who === "user" ? "default" : "secondary",
							children: /* @__PURE__ */ jsx(BubbleContent, { children: text })
						}) })
					})
				}, i))
			}) }), /* @__PURE__ */ jsx(MessageScrollerButton, {})]
		}) })
	});
}
//#endregion
//#region src/docs/demos/message.tsx
var message_exports = /* @__PURE__ */ __exportAll({ default: () => MessageDemo });
function MessageDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-md flex-col gap-8",
		children: [/* @__PURE__ */ jsxs(Message, { children: [/* @__PURE__ */ jsx(MessageAvatar, { children: /* @__PURE__ */ jsx(Avatar$1, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: "SW" }) }) }), /* @__PURE__ */ jsxs(MessageContent, { children: [/* @__PURE__ */ jsx(MessageHeader, { children: "Sam Wong · 9:41" }), /* @__PURE__ */ jsx(Bubble, {
			variant: "secondary",
			children: /* @__PURE__ */ jsx(BubbleContent, { children: "Can the agent pull last quarter's numbers into the deck?" })
		})] })] }), /* @__PURE__ */ jsx(Message, {
			align: "end",
			children: /* @__PURE__ */ jsxs(MessageContent, { children: [/* @__PURE__ */ jsx(Bubble, {
				align: "end",
				children: /* @__PURE__ */ jsx(BubbleContent, { children: "Yes. It reads the finance sheet and fills slides 4 to 6." })
			}), /* @__PURE__ */ jsx(MessageFooter, { children: "Read" })] })
		})]
	});
}
//#endregion
//#region src/components/ui/native-select.tsx
function NativeSelect({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("cn-native-select-wrapper group/native-select relative w-fit has-[select:disabled]:opacity-50", className),
		"data-slot": "native-select-wrapper",
		"data-size": size,
		children: [/* @__PURE__ */ jsx("select", {
			"data-slot": "native-select",
			"data-size": size,
			className: "cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
			...props
		}), /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronDownIcon",
			tabler: "IconSelector",
			hugeicons: "UnfoldMoreIcon",
			phosphor: "CaretDownIcon",
			remixicon: "RiArrowDownSLine",
			className: "cn-native-select-icon pointer-events-none absolute select-none",
			"aria-hidden": "true",
			"data-slot": "native-select-icon"
		})]
	});
}
function NativeSelectOption({ className, ...props }) {
	return /* @__PURE__ */ jsx("option", {
		"data-slot": "native-select-option",
		className: cn("bg-[Canvas] text-[CanvasText]", className),
		...props
	});
}
function NativeSelectOptGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("optgroup", {
		"data-slot": "native-select-optgroup",
		className: cn("bg-[Canvas] text-[CanvasText]", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/native-select.tsx
var native_select_exports = /* @__PURE__ */ __exportAll({ default: () => NativeSelectDemo });
function NativeSelectDemo() {
	return /* @__PURE__ */ jsxs(Field, {
		className: "w-full max-w-xs",
		children: [/* @__PURE__ */ jsx(FieldLabel, {
			htmlFor: "ns-region",
			children: "Data region"
		}), /* @__PURE__ */ jsxs(NativeSelect, {
			id: "ns-region",
			defaultValue: "ca",
			children: [/* @__PURE__ */ jsxs(NativeSelectOptGroup, {
				label: "Americas",
				children: [/* @__PURE__ */ jsx(NativeSelectOption, {
					value: "ca",
					children: "Canada"
				}), /* @__PURE__ */ jsx(NativeSelectOption, {
					value: "us",
					children: "United States"
				})]
			}), /* @__PURE__ */ jsxs(NativeSelectOptGroup, {
				label: "Europe",
				children: [/* @__PURE__ */ jsx(NativeSelectOption, {
					value: "uk",
					children: "United Kingdom"
				}), /* @__PURE__ */ jsx(NativeSelectOption, {
					value: "eu",
					children: "European Union"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/navigation-menu.tsx
function NavigationMenu$1({ align = "start", className, children, ...props }) {
	return /* @__PURE__ */ jsxs(NavigationMenu.Root, {
		"data-slot": "navigation-menu",
		className: cn("cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(NavigationMenuPositioner, { align })]
	});
}
function NavigationMenuList({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.List, {
		"data-slot": "navigation-menu-list",
		className: cn("cn-navigation-menu-list group flex flex-1 list-none items-center justify-center", className),
		...props
	});
}
function NavigationMenuItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Item, {
		"data-slot": "navigation-menu-item",
		className: cn("cn-navigation-menu-item relative", className),
		...props
	});
}
var navigationMenuTriggerStyle = cva("cn-navigation-menu-trigger group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none");
function NavigationMenuTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(NavigationMenu.Trigger, {
		"data-slot": "navigation-menu-trigger",
		className: cn(navigationMenuTriggerStyle(), "group", className),
		...props,
		children: [
			children,
			" ",
			/* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "ChevronDownIcon",
				tabler: "IconChevronDown",
				hugeicons: "ArrowDown01Icon",
				phosphor: "CaretDownIcon",
				remixicon: "RiArrowDownSLine",
				className: "cn-navigation-menu-trigger-icon",
				"aria-hidden": "true"
			})
		]
	});
}
function NavigationMenuContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Content, {
		"data-slot": "navigation-menu-content",
		className: cn("cn-navigation-menu-content data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] h-full w-auto transition-[opacity,transform,translate] duration-[0.35s] data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none", className),
		...props
	});
}
function NavigationMenuPositioner({ className, side = "bottom", sideOffset = 8, align = "start", alignOffset = 0, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Portal, { children: /* @__PURE__ */ jsx(NavigationMenu.Positioner, {
		side,
		sideOffset,
		align,
		alignOffset,
		className: cn("cn-navigation-menu-positioner isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] data-instant:transition-none", className),
		...props,
		children: /* @__PURE__ */ jsx(NavigationMenu.Popup, {
			className: "cn-navigation-menu-popup data-[ending-style]:easing-[ease] xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
			children: /* @__PURE__ */ jsx(NavigationMenu.Viewport, { className: "relative size-full overflow-hidden" })
		})
	}) });
}
function NavigationMenuLink({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Link, {
		"data-slot": "navigation-menu-link",
		className: cn("cn-navigation-menu-link", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/navigation-menu.tsx
var navigation_menu_exports = /* @__PURE__ */ __exportAll({ default: () => NavigationMenuDemo });
var solutions = [
	{
		title: "Proposal writer",
		body: "Client proposals from discovery notes."
	},
	{
		title: "Meeting summariser",
		body: "Actions and decisions from any call."
	},
	{
		title: "Contract reviewer",
		body: "Flags risky clauses before legal review."
	},
	{
		title: "Pricing assistant",
		body: "Quotes from the current rate card."
	}
];
function NavigationMenuDemo() {
	return /* @__PURE__ */ jsx(NavigationMenu$1, { children: /* @__PURE__ */ jsxs(NavigationMenuList, { children: [
		/* @__PURE__ */ jsxs(NavigationMenuItem, { children: [/* @__PURE__ */ jsx(NavigationMenuTrigger, { children: "Agents" }), /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", {
			className: "grid w-[min(28rem,80vw)] gap-1 p-1 sm:grid-cols-2",
			children: solutions.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(NavigationMenuLink, {
				href: "#",
				className: "flex flex-col items-start gap-1",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-sm font-medium",
					children: s.title
				}), /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground text-sm leading-snug",
					children: s.body
				})]
			}) }, s.title))
		}) })] }),
		/* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
			href: "#",
			className: navigationMenuTriggerStyle(),
			children: "Pricing"
		}) }),
		/* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
			href: "#",
			className: navigationMenuTriggerStyle(),
			children: "Docs"
		}) })
	] }) });
}
//#endregion
//#region src/components/ui/pagination.tsx
function Pagination({ className, ...props }) {
	return /* @__PURE__ */ jsx("nav", {
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: cn("cn-pagination mx-auto flex w-full justify-center", className),
		...props
	});
}
function PaginationContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("ul", {
		"data-slot": "pagination-content",
		className: cn("cn-pagination-content flex items-center", className),
		...props
	});
}
function PaginationItem({ ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "pagination-item",
		...props
	});
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
	return /* @__PURE__ */ jsx(Button$1, {
		variant: isActive ? "outline" : "ghost",
		size,
		className: cn("cn-pagination-link", className),
		nativeButton: false,
		render: /* @__PURE__ */ jsx("a", {
			"aria-current": isActive ? "page" : void 0,
			"data-slot": "pagination-link",
			"data-active": isActive,
			...props
		})
	});
}
function PaginationPrevious({ className, text = "Previous", ...props }) {
	return /* @__PURE__ */ jsxs(PaginationLink, {
		"aria-label": "Go to previous page",
		size: "default",
		className: cn("cn-pagination-previous", className),
		...props,
		children: [/* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronLeftIcon",
			tabler: "IconChevronLeft",
			hugeicons: "ArrowLeft01Icon",
			phosphor: "CaretLeftIcon",
			remixicon: "RiArrowLeftSLine",
			"data-icon": "inline-start",
			className: "cn-rtl-flip"
		}), /* @__PURE__ */ jsx("span", {
			className: "cn-pagination-previous-text hidden sm:block",
			children: text
		})]
	});
}
function PaginationNext({ className, text = "Next", ...props }) {
	return /* @__PURE__ */ jsxs(PaginationLink, {
		"aria-label": "Go to next page",
		size: "default",
		className: cn("cn-pagination-next", className),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "cn-pagination-next-text hidden sm:block",
			children: text
		}), /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronRightIcon",
			tabler: "IconChevronRight",
			hugeicons: "ArrowRight01Icon",
			phosphor: "CaretRightIcon",
			remixicon: "RiArrowRightSLine",
			"data-icon": "inline-end",
			className: "cn-rtl-flip"
		})]
	});
}
function PaginationEllipsis({ className, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		"aria-hidden": true,
		"data-slot": "pagination-ellipsis",
		className: cn("cn-pagination-ellipsis flex items-center justify-center", className),
		...props,
		children: [/* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "MoreHorizontalIcon",
			tabler: "IconDots",
			hugeicons: "MoreHorizontalCircle01Icon",
			phosphor: "DotsThreeIcon",
			remixicon: "RiMoreLine"
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "More pages"
		})]
	});
}
//#endregion
//#region src/docs/demos/pagination.tsx
var pagination_exports = /* @__PURE__ */ __exportAll({ default: () => PaginationDemo });
function PaginationDemo() {
	return /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
		/* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationPrevious, { href: "#" }) }),
		/* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationLink, {
			href: "#",
			children: "1"
		}) }),
		/* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationLink, {
			href: "#",
			isActive: true,
			children: "2"
		}) }),
		/* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationLink, {
			href: "#",
			children: "3"
		}) }),
		/* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }),
		/* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationNext, { href: "#" }) })
	] }) });
}
//#endregion
//#region src/docs/demos/popover.tsx
var popover_exports = /* @__PURE__ */ __exportAll({ default: () => PopoverDemo });
function PopoverDemo() {
	return /* @__PURE__ */ jsxs(Popover$1, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "glass" }),
		children: "Run limits"
	}), /* @__PURE__ */ jsxs(PopoverContent, {
		className: "w-72",
		children: [/* @__PURE__ */ jsxs(PopoverHeader, { children: [/* @__PURE__ */ jsx(PopoverTitle, { children: "Run limits" }), /* @__PURE__ */ jsx(PopoverDescription, { children: "Applies to every run of this agent." })] }), /* @__PURE__ */ jsxs(FieldGroup, {
			className: "gap-4",
			children: [/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "pop-tokens",
					className: "flex-1",
					children: "Max tokens"
				}), /* @__PURE__ */ jsx(Input$1, {
					id: "pop-tokens",
					defaultValue: "20,000",
					className: "w-28"
				})]
			}), /* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "pop-time",
					className: "flex-1",
					children: "Timeout (min)"
				}), /* @__PURE__ */ jsx(Input$1, {
					id: "pop-time",
					defaultValue: "10",
					className: "w-28"
				})]
			})]
		})]
	})] });
}
//#endregion
//#region src/docs/demos/progress.tsx
var progress_exports = /* @__PURE__ */ __exportAll({ default: () => ProgressDemo });
function ProgressDemo() {
	const [value, setValue] = React.useState(18);
	React.useEffect(() => {
		const t = setInterval(() => setValue((v) => v >= 100 ? 18 : Math.min(100, v + 9)), 900);
		return () => clearInterval(t);
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-sm flex-col gap-8",
		children: [/* @__PURE__ */ jsxs(Progress$1, {
			value,
			children: [/* @__PURE__ */ jsx(ProgressLabel, { children: "Indexing documents" }), /* @__PURE__ */ jsx(ProgressValue, {})]
		}), /* @__PURE__ */ jsx(Progress$1, {
			value: 64,
			"aria-label": "Storage used"
		})]
	});
}
//#endregion
//#region src/components/ui/questionnaire.tsx
function Questionnaire$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Root, {
		"data-slot": "questionnaire",
		className: cn("cn-questionnaire flex w-full min-w-0 flex-col", className),
		...props
	});
}
function QuestionnaireProgress({ className, ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Progress, {
		"data-slot": "questionnaire-progress",
		className: cn("cn-questionnaire-progress min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums", className),
		...props
	});
}
function QuestionnaireItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Item, {
		"data-slot": "questionnaire-item",
		className: cn("cn-questionnaire-item min-w-0 border-0 p-0 outline-none", className),
		...props
	});
}
function QuestionnaireTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Title, {
		"data-slot": "questionnaire-title",
		className: cn("cn-questionnaire-title cn-font-heading text-pretty", className),
		...props
	});
}
function QuestionnaireDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Description, {
		"data-slot": "questionnaire-description",
		className: cn("cn-questionnaire-description text-pretty text-muted-foreground", className),
		...props
	});
}
function QuestionnaireChoices({ className, ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Choices, {
		"data-slot": "questionnaire-choices",
		className: cn("cn-questionnaire-choices group/questionnaire-choices grid min-w-0", className),
		...props
	});
}
function QuestionnaireChoice({ children, className, ...props }) {
	return /* @__PURE__ */ jsxs(Questionnaire.Choice, {
		"data-slot": "questionnaire-choice",
		className: cn("cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none", "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: [
			/* @__PURE__ */ jsx(Questionnaire.ChoiceInput, {
				"data-slot": "questionnaire-choice-input",
				className: "cn-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0"
			}),
			/* @__PURE__ */ jsxs("span", {
				"aria-hidden": "true",
				"data-slot": "questionnaire-choice-indicator",
				className: "cn-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full",
				children: [/* @__PURE__ */ jsx("span", {
					"data-slot": "questionnaire-choice-indicator-dot",
					className: "cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
				}), /* @__PURE__ */ jsx(IconPlaceholder, {
					"data-slot": "questionnaire-choice-indicator-check",
					className: "cn-questionnaire-choice-indicator-check hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block",
					lucide: "CheckIcon",
					tabler: "IconCheck",
					hugeicons: "Tick02Icon",
					phosphor: "CheckIcon",
					remixicon: "RiCheckLine"
				})]
			}),
			/* @__PURE__ */ jsx(Questionnaire.ChoiceLabel, {
				"data-slot": "questionnaire-choice-label",
				className: "cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug",
				children
			}),
			/* @__PURE__ */ jsx(Questionnaire.ChoiceShortcut, {
				"data-slot": "questionnaire-choice-shortcut",
				className: "cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex"
			})
		]
	});
}
function QuestionnaireChoiceDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "questionnaire-choice-description",
		className: cn("cn-questionnaire-choice-description", className),
		...props
	});
}
function QuestionnaireActions({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "questionnaire-actions",
		className: cn("cn-questionnaire-actions grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center", className),
		...props
	});
}
function QuestionnairePrevious({ children, className, size = "default", variant = "outline", ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Previous, {
		"data-slot": "questionnaire-previous",
		"data-size": size,
		"data-variant": variant,
		className: cn(buttonVariants({
			size,
			variant
		}), "cn-questionnaire-previous col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0", className),
		...props,
		children: children ?? "Previous"
	});
}
function QuestionnaireNext({ children, className, size = "default", variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Next, {
		"data-slot": "questionnaire-next",
		"data-size": size,
		"data-variant": variant,
		className: cn(buttonVariants({
			size,
			variant
		}), "cn-questionnaire-next col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0", className),
		...props,
		children: children ?? "Next"
	});
}
function QuestionnaireSubmit({ children, className, size = "default", variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(Questionnaire.Submit, {
		"data-slot": "questionnaire-submit",
		"data-size": size,
		"data-variant": variant,
		className: cn(buttonVariants({
			size,
			variant
		}), "cn-questionnaire-submit col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0", className),
		...props,
		children: children ?? "Submit"
	});
}
//#endregion
//#region src/docs/demos/questionnaire.tsx
var questionnaire_exports = /* @__PURE__ */ __exportAll({ default: () => QuestionnaireDemo });
var items = [{
	name: "tone",
	required: true,
	choices: [
		{ value: "formal" },
		{ value: "warm" },
		{ value: "brief" }
	]
}, {
	name: "length",
	required: true,
	choices: [
		{ value: "one" },
		{ value: "three" },
		{ value: "six" }
	]
}];
function QuestionnaireDemo() {
	function onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		toast("Got it. Drafting now.", { description: `Tone: ${data.get("tone")}, length: ${data.get("length")} page(s)` });
	}
	return /* @__PURE__ */ jsx("div", {
		className: "glass w-full max-w-lg rounded-3xl border p-6",
		children: /* @__PURE__ */ jsxs(Questionnaire$1, {
			defaultItem: "tone",
			items,
			onSubmit,
			children: [
				/* @__PURE__ */ jsx(QuestionnaireProgress, {}),
				/* @__PURE__ */ jsxs(QuestionnaireItem, {
					name: "tone",
					required: true,
					children: [
						/* @__PURE__ */ jsx(QuestionnaireTitle, { children: "What tone should the proposal take?" }),
						/* @__PURE__ */ jsx(QuestionnaireDescription, { children: "The agent matches this throughout." }),
						/* @__PURE__ */ jsxs(QuestionnaireChoices, { children: [
							/* @__PURE__ */ jsxs(QuestionnaireChoice, {
								value: "formal",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: "Formal"
								}), /* @__PURE__ */ jsx(QuestionnaireChoiceDescription, { children: "For procurement and legal readers" })]
							}),
							/* @__PURE__ */ jsxs(QuestionnaireChoice, {
								value: "warm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: "Warm"
								}), /* @__PURE__ */ jsx(QuestionnaireChoiceDescription, { children: "For a sponsor you know well" })]
							}),
							/* @__PURE__ */ jsxs(QuestionnaireChoice, {
								value: "brief",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: "Brief"
								}), /* @__PURE__ */ jsx(QuestionnaireChoiceDescription, { children: "For executives who skim" })]
							})
						] })
					]
				}),
				/* @__PURE__ */ jsxs(QuestionnaireItem, {
					name: "length",
					required: true,
					children: [/* @__PURE__ */ jsx(QuestionnaireTitle, { children: "How long?" }), /* @__PURE__ */ jsxs(QuestionnaireChoices, { children: [
						/* @__PURE__ */ jsx(QuestionnaireChoice, {
							value: "one",
							children: "One page"
						}),
						/* @__PURE__ */ jsx(QuestionnaireChoice, {
							value: "three",
							children: "Three pages"
						}),
						/* @__PURE__ */ jsx(QuestionnaireChoice, {
							value: "six",
							children: "Six pages"
						})
					] })]
				}),
				/* @__PURE__ */ jsxs(QuestionnaireActions, {
					className: "w-full",
					children: [
						/* @__PURE__ */ jsx(QuestionnairePrevious, {}),
						/* @__PURE__ */ jsx(QuestionnaireNext, { children: "Next" }),
						/* @__PURE__ */ jsx(QuestionnaireSubmit, { children: "Start drafting" })
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/ui/radio-group.tsx
function RadioGroup$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(RadioGroup, {
		"data-slot": "radio-group",
		className: cn("cn-radio-group w-full", className),
		...props
	});
}
function RadioGroupItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Radio.Root, {
		"data-slot": "radio-group-item",
		className: cn("cn-radio-group-item group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(Radio.Indicator, {
			"data-slot": "radio-group-indicator",
			className: "cn-radio-group-indicator",
			children: /* @__PURE__ */ jsx("span", { className: "cn-radio-group-indicator-icon" })
		})
	});
}
//#endregion
//#region src/docs/demos/radio-group.tsx
var radio_group_exports = /* @__PURE__ */ __exportAll({ default: () => RadioGroupDemo });
var options = [
	{
		value: "draft",
		label: "Save as draft",
		desc: "Only you can see it."
	},
	{
		value: "team",
		label: "Share with my team",
		desc: "Your team can run it, not edit it."
	},
	{
		value: "company",
		label: "Publish to the marketplace",
		desc: "Everyone at the company can find and run it."
	}
];
function RadioGroupDemo() {
	return /* @__PURE__ */ jsxs(FieldSet, {
		className: "w-full max-w-sm",
		children: [/* @__PURE__ */ jsx(FieldLegend, { children: "Visibility" }), /* @__PURE__ */ jsx(RadioGroup$1, {
			defaultValue: "team",
			children: options.map((o) => /* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsx(RadioGroupItem, {
					value: o.value,
					id: `rg-${o.value}`
				}), /* @__PURE__ */ jsxs(FieldContent, { children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: `rg-${o.value}`,
					children: o.label
				}), /* @__PURE__ */ jsx(FieldDescription, { children: o.desc })] })]
			}, o.value))
		})]
	});
}
//#endregion
//#region src/components/ui/resizable.tsx
function ResizablePanelGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(ResizablePrimitive.Group, {
		"data-slot": "resizable-panel-group",
		className: cn("cn-resizable-panel-group flex h-full w-full aria-[orientation=vertical]:flex-col", className),
		...props
	});
}
function ResizablePanel({ ...props }) {
	return /* @__PURE__ */ jsx(ResizablePrimitive.Panel, {
		"data-slot": "resizable-panel",
		...props
	});
}
function ResizableHandle({ withHandle, className, ...props }) {
	return /* @__PURE__ */ jsx(ResizablePrimitive.Separator, {
		"data-slot": "resizable-handle",
		className: cn("cn-resizable-handle relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90", className),
		...props,
		children: withHandle && /* @__PURE__ */ jsx("div", { className: "cn-resizable-handle-icon z-10 flex shrink-0" })
	});
}
//#endregion
//#region src/docs/demos/resizable.tsx
var resizable_exports = /* @__PURE__ */ __exportAll({ default: () => ResizableDemo });
function ResizableDemo() {
	return /* @__PURE__ */ jsxs(ResizablePanelGroup, {
		orientation: "horizontal",
		className: "glass min-h-64 w-full max-w-xl rounded-3xl border",
		children: [
			/* @__PURE__ */ jsx(ResizablePanel, {
				defaultSize: "30%",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex h-full flex-col gap-2 p-5 text-sm",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold",
							children: "Runs"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "r-1042"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "r-1041"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "r-1040"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx(ResizableHandle, { withHandle: true }),
			/* @__PURE__ */ jsx(ResizablePanel, {
				defaultSize: "70%",
				children: /* @__PURE__ */ jsxs(ResizablePanelGroup, {
					orientation: "vertical",
					children: [
						/* @__PURE__ */ jsx(ResizablePanel, {
							defaultSize: "60%",
							children: /* @__PURE__ */ jsx("div", {
								className: "flex h-full items-center justify-center p-5 text-sm font-medium",
								children: "Output"
							})
						}),
						/* @__PURE__ */ jsx(ResizableHandle, { withHandle: true }),
						/* @__PURE__ */ jsx(ResizablePanel, {
							defaultSize: "40%",
							children: /* @__PURE__ */ jsx("div", {
								className: "text-muted-foreground flex h-full items-center justify-center p-5 text-sm",
								children: "Logs"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/ui/scroll-area.tsx
function ScrollArea$1({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(ScrollArea.Root, {
		"data-slot": "scroll-area",
		className: cn("cn-scroll-area relative", className),
		...props,
		children: [
			/* @__PURE__ */ jsx(ScrollArea.Viewport, {
				"data-slot": "scroll-area-viewport",
				className: "cn-scroll-area-viewport size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children
			}),
			/* @__PURE__ */ jsx(ScrollBar, {}),
			/* @__PURE__ */ jsx(ScrollArea.Corner, {})
		]
	});
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx(ScrollArea.Scrollbar, {
		"data-slot": "scroll-area-scrollbar",
		"data-orientation": orientation,
		orientation,
		className: cn("cn-scroll-area-scrollbar flex touch-none p-px transition-colors select-none", className),
		...props,
		children: /* @__PURE__ */ jsx(ScrollArea.Thumb, {
			"data-slot": "scroll-area-thumb",
			className: "cn-scroll-area-thumb relative flex-1"
		})
	});
}
//#endregion
//#region src/docs/demos/scroll-area.tsx
var scroll_area_exports = /* @__PURE__ */ __exportAll({ default: () => ScrollAreaDemo });
var releases = Array.from({ length: 40 }, (_, i) => ({
	version: `v2.${40 - i}.0`,
	note: [
		"Faster cold starts",
		"New Trace view",
		"Glass menus",
		"Bug fixes",
		"Theme tokens"
	][i % 5]
}));
var swatches = [
	{
		name: "Dawn",
		from: "var(--backdrop-1)",
		to: "var(--backdrop-2)"
	},
	{
		name: "Harbour",
		from: "var(--backdrop-3)",
		to: "var(--backdrop-1)"
	},
	{
		name: "Bloom",
		from: "var(--backdrop-2)",
		to: "var(--chart-2)"
	},
	{
		name: "Signal",
		from: "var(--chart-1)",
		to: "var(--chart-3)"
	},
	{
		name: "Ember",
		from: "var(--chart-4)",
		to: "var(--chart-2)"
	},
	{
		name: "Tide",
		from: "var(--chart-3)",
		to: "var(--backdrop-3)"
	}
];
function ScrollAreaDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-wrap items-start justify-center gap-6",
		children: [/* @__PURE__ */ jsx(Card, {
			variant: "glass",
			className: "w-60 gap-0 p-0",
			children: /* @__PURE__ */ jsx(ScrollArea$1, {
				className: "h-80",
				children: /* @__PURE__ */ jsxs("div", {
					className: "p-5",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "mb-4 text-sm font-semibold",
						children: "Release notes"
					}), releases.map((r) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs",
							children: r.version
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: r.note
						})]
					}), /* @__PURE__ */ jsx(Separator$1, { className: "my-2.5" })] }, r.version))]
				})
			})
		}), /* @__PURE__ */ jsx(Card, {
			variant: "glass",
			className: "w-full max-w-sm gap-0 p-0",
			children: /* @__PURE__ */ jsxs(ScrollArea$1, {
				className: "w-full",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex w-max gap-3 p-4",
					children: swatches.map((s) => /* @__PURE__ */ jsxs("figure", {
						className: "flex w-36 shrink-0 flex-col gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-[3/4] rounded-2xl",
							style: { background: `linear-gradient(160deg, ${s.from}, ${s.to})` }
						}), /* @__PURE__ */ jsxs("figcaption", {
							className: "text-muted-foreground text-xs",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-foreground font-medium",
								children: s.name
							}), " backdrop"]
						})]
					}, s.name))
				}), /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" })]
			})
		})]
	});
}
//#endregion
//#region src/components/ui/select.tsx
var Select$1 = Select.Root;
function SelectGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.Group, {
		"data-slot": "select-group",
		className: cn("cn-select-group", className),
		...props
	});
}
function SelectValue({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.Value, {
		"data-slot": "select-value",
		className: cn("cn-select-value", className),
		...props
	});
}
function SelectTrigger({ className, size = "default", children, ...props }) {
	return /* @__PURE__ */ jsxs(Select.Trigger, {
		"data-slot": "select-trigger",
		"data-size": size,
		className: cn("cn-select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Select.Icon, { render: /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronDownIcon",
			tabler: "IconSelector",
			hugeicons: "UnfoldMoreIcon",
			phosphor: "CaretDownIcon",
			remixicon: "RiArrowDownSLine",
			className: "cn-select-trigger-icon pointer-events-none"
		}) })]
	});
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }) {
	return /* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsx(Select.Positioner, {
		side,
		sideOffset,
		align,
		alignOffset,
		alignItemWithTrigger,
		className: "isolate z-50",
		children: /* @__PURE__ */ jsxs(Select.Popup, {
			"data-slot": "select-content",
			"data-align-trigger": alignItemWithTrigger,
			className: cn("cn-select-content cn-select-content-logical cn-menu-target cn-menu-translucent relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none", className),
			...props,
			children: [
				/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
				/* @__PURE__ */ jsx(Select.List, { children }),
				/* @__PURE__ */ jsx(SelectScrollDownButton, {})
			]
		})
	}) });
}
function SelectLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.GroupLabel, {
		"data-slot": "select-label",
		className: cn("cn-select-label", className),
		...props
	});
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Select.Item, {
		"data-slot": "select-item",
		className: cn("cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className),
		...props,
		children: [/* @__PURE__ */ jsx(Select.ItemText, {
			className: "cn-select-item-text shrink-0 whitespace-nowrap",
			children
		}), /* @__PURE__ */ jsx(Select.ItemIndicator, {
			render: /* @__PURE__ */ jsx("span", { className: "cn-select-item-indicator" }),
			children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "CheckIcon",
				tabler: "IconCheck",
				hugeicons: "Tick02Icon",
				phosphor: "CheckIcon",
				remixicon: "RiCheckLine",
				className: "cn-select-item-indicator-icon pointer-events-none"
			})
		})]
	});
}
function SelectSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.Separator, {
		"data-slot": "select-separator",
		className: cn("cn-select-separator pointer-events-none", className),
		...props
	});
}
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.ScrollUpArrow, {
		"data-slot": "select-scroll-up-button",
		className: cn("cn-select-scroll-up-button top-0 w-full", className),
		...props,
		children: /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronUpIcon",
			tabler: "IconChevronUp",
			hugeicons: "ArrowUp01Icon",
			phosphor: "CaretUpIcon",
			remixicon: "RiArrowUpSLine"
		})
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.ScrollDownArrow, {
		"data-slot": "select-scroll-down-button",
		className: cn("cn-select-scroll-down-button bottom-0 w-full", className),
		...props,
		children: /* @__PURE__ */ jsx(IconPlaceholder, {
			lucide: "ChevronDownIcon",
			tabler: "IconChevronDown",
			hugeicons: "ArrowDown01Icon",
			phosphor: "CaretDownIcon",
			remixicon: "RiArrowDownSLine"
		})
	});
}
//#endregion
//#region src/docs/demos/select.tsx
var select_exports = /* @__PURE__ */ __exportAll({ default: () => SelectDemo });
var models = [
	{
		label: "Choose a model",
		value: null
	},
	{
		label: "Fast",
		value: "fast"
	},
	{
		label: "Balanced",
		value: "balanced"
	},
	{
		label: "Most capable",
		value: "capable"
	}
];
function SelectDemo() {
	return /* @__PURE__ */ jsxs(Field, {
		className: "w-full max-w-xs",
		children: [/* @__PURE__ */ jsx(FieldLabel, { children: "Model" }), /* @__PURE__ */ jsxs(Select$1, {
			items: models,
			defaultValue: "balanced",
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "w-full",
				children: /* @__PURE__ */ jsx(SelectValue, {})
			}), /* @__PURE__ */ jsxs(SelectContent, { children: [
				/* @__PURE__ */ jsxs(SelectGroup, { children: [/* @__PURE__ */ jsx(SelectLabel, { children: "Speed first" }), /* @__PURE__ */ jsx(SelectItem, {
					value: "fast",
					children: "Fast"
				})] }),
				/* @__PURE__ */ jsx(SelectSeparator, {}),
				/* @__PURE__ */ jsxs(SelectGroup, { children: [
					/* @__PURE__ */ jsx(SelectLabel, { children: "Quality first" }),
					/* @__PURE__ */ jsx(SelectItem, {
						value: "balanced",
						children: "Balanced"
					}),
					/* @__PURE__ */ jsx(SelectItem, {
						value: "capable",
						children: "Most capable"
					})
				] })
			] })]
		})]
	});
}
//#endregion
//#region src/docs/demos/separator.tsx
var separator_exports = /* @__PURE__ */ __exportAll({ default: () => SeparatorDemo });
function SeparatorDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "glass w-full max-w-sm rounded-3xl border p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ jsx("h4", {
					className: "font-semibold",
					children: "Proposal writer"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-sm",
					children: "Owned by the sales team"
				})]
			}),
			/* @__PURE__ */ jsx(Separator$1, { className: "my-4" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex h-5 items-center gap-4 text-sm",
				children: [
					/* @__PURE__ */ jsx("span", { children: "Runs" }),
					/* @__PURE__ */ jsx(Separator$1, { orientation: "vertical" }),
					/* @__PURE__ */ jsx("span", { children: "Settings" }),
					/* @__PURE__ */ jsx(Separator$1, { orientation: "vertical" }),
					/* @__PURE__ */ jsx("span", { children: "Access" })
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/sheet.tsx
function Sheet({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		"data-slot": "sheet",
		...props
	});
}
function SheetTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Trigger, {
		"data-slot": "sheet-trigger",
		...props
	});
}
function SheetClose({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Close, {
		"data-slot": "sheet-close",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Backdrop, {
		"data-slot": "sheet-overlay",
		className: cn("cn-sheet-overlay fixed inset-0 z-50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Popup, {
		"data-slot": "sheet-content",
		"data-side": side,
		className: cn("cn-sheet-content data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem]", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ jsx(Button$1, {
				variant: "ghost",
				className: "cn-sheet-close",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "XIcon",
				tabler: "IconX",
				hugeicons: "Cancel01Icon",
				phosphor: "XIcon",
				remixicon: "RiCloseLine"
			}), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-header",
		className: cn("cn-sheet-header flex flex-col", className),
		...props
	});
}
function SheetFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-footer",
		className: cn("cn-sheet-footer mt-auto flex flex-col", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "sheet-title",
		className: cn("cn-sheet-title cn-font-heading", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Description, {
		"data-slot": "sheet-description",
		className: cn("cn-sheet-description", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/sheet.tsx
var sheet_exports = /* @__PURE__ */ __exportAll({ default: () => SheetDemo });
var teams = [
	"Sales",
	"Delivery",
	"Operations",
	"Finance"
];
function SheetDemo() {
	return /* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
		render: /* @__PURE__ */ jsx(Button$1, { variant: "glass" }),
		children: "Filter agents"
	}), /* @__PURE__ */ jsxs(SheetContent, { children: [
		/* @__PURE__ */ jsxs(SheetHeader, { children: [/* @__PURE__ */ jsx(SheetTitle, { children: "Filter agents" }), /* @__PURE__ */ jsx(SheetDescription, { children: "Show agents owned by these teams." })] }),
		/* @__PURE__ */ jsxs(FieldSet, {
			className: "px-6",
			children: [/* @__PURE__ */ jsx(FieldLegend, {
				variant: "label",
				children: "Teams"
			}), /* @__PURE__ */ jsx(FieldGroup, {
				className: "gap-3",
				children: teams.map((t, i) => /* @__PURE__ */ jsxs(Field, {
					orientation: "horizontal",
					children: [/* @__PURE__ */ jsx(Checkbox$1, {
						id: `sh-${t}`,
						defaultChecked: i < 2
					}), /* @__PURE__ */ jsx(FieldLabel, {
						htmlFor: `sh-${t}`,
						children: t
					})]
				}, t))
			})]
		}),
		/* @__PURE__ */ jsxs(SheetFooter, { children: [/* @__PURE__ */ jsx(SheetClose, {
			render: /* @__PURE__ */ jsx(Button$1, {}),
			children: "Show 14 agents"
		}), /* @__PURE__ */ jsx(SheetClose, {
			render: /* @__PURE__ */ jsx(Button$1, { variant: "outline" }),
			children: "Clear filters"
		})] })
	] })] });
}
//#endregion
//#region src/hooks/use-mobile.ts
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState(void 0);
	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
//#endregion
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton",
		className: cn("cn-skeleton animate-pulse", className),
		...props
	});
}
//#endregion
//#region src/components/ui/tooltip.tsx
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Root, {
		"data-slot": "tooltip",
		...props
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
	return /* @__PURE__ */ jsx(Tooltip.Portal, { children: /* @__PURE__ */ jsx(Tooltip.Positioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ jsxs(Tooltip.Popup, {
			"data-slot": "tooltip-content",
			className: cn("cn-tooltip-content cn-tooltip-content-logical z-50 w-fit max-w-xs origin-(--transform-origin) bg-foreground text-background", className),
			...props,
			children: [children, /* @__PURE__ */ jsx(Tooltip.Arrow, { className: "cn-tooltip-arrow cn-tooltip-arrow-logical z-50 bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
		})
	}) });
}
//#endregion
//#region src/components/ui/sidebar.tsx
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 604800;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React.createContext(null);
function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = React.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ jsx(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": SIDEBAR_WIDTH,
				"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
				...style
			},
			className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
			...props,
			children
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar",
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ jsx(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ jsxs(SheetContent, {
			dir,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ jsxs(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "sidebar-gap",
			className: cn("cn-sidebar-gap relative w-(--sidebar-width) bg-transparent", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ jsx("div", {
			"data-slot": "sidebar-container",
			"data-side": side,
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ jsx("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "cn-sidebar-inner flex size-full flex-col",
				children
			})
		})]
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("cn-sidebar-header flex flex-col", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("cn-sidebar-footer flex flex-col", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("cn-sidebar-content flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("cn-sidebar-group relative flex w-full min-w-0 flex-col", className),
		...props
	});
}
function SidebarGroupLabel({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("cn-sidebar-group-label flex shrink-0 items-center outline-hidden [&>svg]:shrink-0", className) }, props),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function SidebarGroupContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: cn("cn-sidebar-group-content w-full", className),
		...props
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ jsx("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("cn-sidebar-menu flex w-full min-w-0 flex-col", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("cn-sidebar-menu-button peer/menu-button group/menu-button flex w-full items-center overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "cn-sidebar-menu-button-variant-default",
			outline: "cn-sidebar-menu-button-variant-outline"
		},
		size: {
			default: "cn-sidebar-menu-button-size-default",
			sm: "cn-sidebar-menu-button-size-sm",
			lg: "cn-sidebar-menu-button-size-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps({ className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className) }, props),
		render: !tooltip ? render : /* @__PURE__ */ jsx(TooltipTrigger, { render }),
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive
		}
	});
	if (!tooltip) return comp;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ jsxs(Tooltip$1, { children: [comp, /* @__PURE__ */ jsx(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
function SidebarMenuBadge({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		className: cn("cn-sidebar-menu-badge flex items-center justify-center tabular-nums select-none group-data-[collapsible=icon]:hidden", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/sidebar.tsx
var sidebar_exports = /* @__PURE__ */ __exportAll({ default: () => SidebarDemo });
var nav = [
	{
		label: "Home",
		icon: HomeIcon,
		active: true
	},
	{
		label: "Agents",
		icon: BotIcon,
		badge: "12"
	},
	{
		label: "Library",
		icon: LibraryIcon
	},
	{
		label: "Settings",
		icon: SettingsIcon
	}
];
function SidebarDemo() {
	return /* @__PURE__ */ jsxs(SidebarProvider, {
		className: "min-h-0 w-full max-w-2xl overflow-hidden rounded-3xl border",
		children: [/* @__PURE__ */ jsxs(Sidebar, {
			collapsible: "none",
			className: "h-[420px]",
			children: [
				/* @__PURE__ */ jsx(SidebarHeader, {
					className: "px-4 pt-4 text-sm font-semibold",
					children: "Workspace"
				}),
				/* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsxs(SidebarGroup, { children: [/* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Navigate" }), /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: nav.map((n) => /* @__PURE__ */ jsxs(SidebarMenuItem, { children: [/* @__PURE__ */ jsxs(SidebarMenuButton, {
					isActive: n.active,
					render: /* @__PURE__ */ jsx("a", { href: "#" }),
					children: [/* @__PURE__ */ jsx(n.icon, {}), /* @__PURE__ */ jsx("span", { children: n.label })]
				}), n.badge && /* @__PURE__ */ jsx(SidebarMenuBadge, { children: n.badge })] }, n.label)) }) })] }) }),
				/* @__PURE__ */ jsx(SidebarFooter, { children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2.5 p-2",
					children: [/* @__PURE__ */ jsx(Avatar$1, {
						size: "sm",
						children: /* @__PURE__ */ jsx(AvatarFallback, { children: "RK" })
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-medium",
						children: "Renee Kim"
					})]
				}) })
			]
		}), /* @__PURE__ */ jsxs("main", {
			className: "bg-background/40 flex flex-1 flex-col gap-2 p-8",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-xl font-semibold tracking-tight",
				children: "Home"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-sm",
				children: "Your recent runs and pinned agents show here."
			})]
		})]
	});
}
//#endregion
//#region src/docs/demos/skeleton.tsx
var skeleton_exports = /* @__PURE__ */ __exportAll({ default: () => SkeletonDemo });
function SkeletonDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "glass flex w-full max-w-sm flex-col gap-4 rounded-3xl border p-6",
		"aria-busy": "true",
		"aria-label": "Loading agent",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsx(Skeleton, { className: "size-10 rounded-full" }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/3" })]
				})]
			}),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-9 w-28 self-end rounded-full" })
		]
	});
}
//#endregion
//#region src/docs/demos/slider.tsx
var slider_exports = /* @__PURE__ */ __exportAll({ default: () => SliderDemo });
function SliderDemo() {
	const [temp, setTemp] = React.useState([.4]);
	const [range, setRange] = React.useState([20, 80]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-sm flex-col gap-10",
		children: [/* @__PURE__ */ jsxs(Field, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ jsx(FieldLabel, { children: "Creativity" }), /* @__PURE__ */ jsx("span", {
					className: "text-sm font-medium tabular-nums",
					children: temp[0].toFixed(1)
				})]
			}),
			/* @__PURE__ */ jsx(Slider$1, {
				value: temp,
				onValueChange: (v) => setTemp(v),
				min: 0,
				max: 1,
				step: .1,
				"aria-label": "Creativity"
			}),
			/* @__PURE__ */ jsx(FieldDescription, { children: "Lower is more predictable. Higher tries more ideas." })
		] }), /* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ jsx(FieldLabel, { children: "Page range" }), /* @__PURE__ */ jsxs("span", {
				className: "text-sm font-medium tabular-nums",
				children: [
					range[0],
					" to ",
					range[1]
				]
			})]
		}), /* @__PURE__ */ jsx(Slider$1, {
			value: range,
			onValueChange: (v) => setRange(v),
			"aria-label": "Page range"
		})] })]
	});
}
//#endregion
//#region src/docs/demos/sonner.tsx
var sonner_exports = /* @__PURE__ */ __exportAll({ default: () => SonnerDemo });
function SonnerDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-center gap-3",
		children: [
			/* @__PURE__ */ jsx(Button$1, {
				variant: "glass",
				onClick: () => toast("Agent published", {
					description: "Everyone in the workspace can run it now.",
					action: {
						label: "Undo",
						onClick: () => toast("Publishing undone")
					}
				}),
				children: "Show toast"
			}),
			/* @__PURE__ */ jsx(Button$1, {
				variant: "outline",
				onClick: () => toast.success("Proposal saved to SharePoint"),
				children: "Success"
			}),
			/* @__PURE__ */ jsx(Button$1, {
				variant: "outline",
				onClick: () => toast.promise(new Promise((r) => setTimeout(r, 1600)), {
					loading: "Exporting run history",
					success: "Export ready",
					error: "Export failed. Try again."
				}),
				children: "Promise"
			})
		]
	});
}
//#endregion
//#region src/docs/demos/spinner.tsx
var spinner_exports = /* @__PURE__ */ __exportAll({ default: () => SpinnerDemo });
function SpinnerDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-center gap-4",
		children: [
			/* @__PURE__ */ jsx(Spinner, { "aria-label": "Loading" }),
			/* @__PURE__ */ jsxs(Button$1, {
				disabled: true,
				children: [/* @__PURE__ */ jsx(Spinner, { "data-icon": "inline-start" }), "Saving changes"]
			}),
			/* @__PURE__ */ jsxs(Badge, {
				variant: "secondary",
				children: [/* @__PURE__ */ jsx(Spinner, { "data-icon": "inline-start" }), "Indexing"]
			})
		]
	});
}
//#endregion
//#region src/docs/demos/switch.tsx
var switch_exports = /* @__PURE__ */ __exportAll({ default: () => SwitchDemo });
function SwitchDemo() {
	return /* @__PURE__ */ jsxs(FieldGroup, {
		className: "glass w-full max-w-sm rounded-3xl border p-6",
		children: [
			/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsxs(FieldContent, { children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "sw-memory",
					children: "Remember past runs"
				}), /* @__PURE__ */ jsx(FieldDescription, { children: "The agent can reuse earlier answers." })] }), /* @__PURE__ */ jsx(Switch$1, {
					id: "sw-memory",
					defaultChecked: true
				})]
			}),
			/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				children: [/* @__PURE__ */ jsxs(FieldContent, { children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "sw-web",
					children: "Search the web"
				}), /* @__PURE__ */ jsx(FieldDescription, { children: "Adds public sources to answers." })] }), /* @__PURE__ */ jsx(Switch$1, { id: "sw-web" })]
			}),
			/* @__PURE__ */ jsxs(Field, {
				orientation: "horizontal",
				"data-disabled": true,
				children: [/* @__PURE__ */ jsxs(FieldContent, { children: [/* @__PURE__ */ jsx(FieldLabel, {
					htmlFor: "sw-ext",
					children: "Share outside the company"
				}), /* @__PURE__ */ jsx(FieldDescription, { children: "Turned off by your admin." })] }), /* @__PURE__ */ jsx(Switch$1, {
					id: "sw-ext",
					disabled: true
				})]
			})
		]
	});
}
//#endregion
//#region src/docs/demos/table.tsx
var table_exports = /* @__PURE__ */ __exportAll({ default: () => TableDemo });
var rows = [
	{
		agent: "Proposal writer",
		runs: 412,
		hours: 206
	},
	{
		agent: "Meeting summariser",
		runs: 1280,
		hours: 320
	},
	{
		agent: "Contract reviewer",
		runs: 96,
		hours: 144
	}
];
function TableDemo() {
	return /* @__PURE__ */ jsx("div", {
		className: "glass w-full max-w-xl overflow-x-auto rounded-3xl border p-2",
		children: /* @__PURE__ */ jsxs(Table, { children: [
			/* @__PURE__ */ jsx(TableCaption, { children: "Time saved in September, sample data." }),
			/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableHead, { children: "Agent" }),
				/* @__PURE__ */ jsx(TableHead, {
					className: "text-right",
					children: "Runs"
				}),
				/* @__PURE__ */ jsx(TableHead, {
					className: "text-right",
					children: "Hours saved"
				})
			] }) }),
			/* @__PURE__ */ jsx(TableBody, { children: rows.map((r) => /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableCell, {
					className: "font-medium",
					children: r.agent
				}),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right tabular-nums",
					children: r.runs.toLocaleString()
				}),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right tabular-nums",
					children: r.hours
				})
			] }, r.agent)) }),
			/* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
				/* @__PURE__ */ jsx(TableCell, { children: "Total" }),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right tabular-nums",
					children: "1,788"
				}),
				/* @__PURE__ */ jsx(TableCell, {
					className: "text-right tabular-nums",
					children: "670"
				})
			] }) })
		] })
	});
}
//#endregion
//#region src/components/ui/tabs.tsx
function Tabs$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Root, {
		"data-slot": "tabs",
		"data-orientation": orientation,
		className: cn("cn-tabs group/tabs flex data-horizontal:flex-col", className),
		...props
	});
}
var tabsListVariants = cva("cn-tabs-list group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col", {
	variants: { variant: {
		default: "cn-tabs-list-variant-default bg-muted",
		line: "cn-tabs-list-variant-line gap-1 bg-transparent",
		glass: "cn-tabs-list-variant-glass"
	} },
	defaultVariants: { variant: "default" }
});
function TabsList({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(Tabs.List, {
		"data-slot": "tabs-list",
		"data-variant": variant,
		className: cn(tabsListVariants({ variant }), className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Tab, {
		"data-slot": "tabs-trigger",
		className: cn("cn-tabs-trigger relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Panel, {
		"data-slot": "tabs-content",
		className: cn("cn-tabs-content flex-1 outline-none", className),
		...props
	});
}
//#endregion
//#region src/docs/demos/tabs.tsx
var tabs_exports = /* @__PURE__ */ __exportAll({ default: () => TabsDemo });
function TabsDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full max-w-md flex-col gap-10",
		children: [/* @__PURE__ */ jsxs(Tabs$1, {
			defaultValue: "overview",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					variant: "glass",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "overview",
							children: "Overview"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "runs",
							children: "Runs"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "access",
							children: "Access"
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "overview",
					className: "mt-3",
					children: /* @__PURE__ */ jsx(Card, {
						variant: "glass",
						children: /* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Overview" }), /* @__PURE__ */ jsx(CardDescription, { children: "Drafts client proposals from discovery notes and past wins." })] })
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "runs",
					className: "mt-3",
					children: /* @__PURE__ */ jsx(Card, {
						variant: "glass",
						children: /* @__PURE__ */ jsx(CardContent, {
							className: "text-sm",
							children: "412 runs this month, 3 failed."
						})
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "access",
					className: "mt-3",
					children: /* @__PURE__ */ jsx(Card, {
						variant: "glass",
						children: /* @__PURE__ */ jsx(CardContent, {
							className: "text-sm",
							children: "Sales and Delivery can run it. Only owners can edit."
						})
					})
				})
			]
		}), /* @__PURE__ */ jsx(Tabs$1, {
			defaultValue: "week",
			children: /* @__PURE__ */ jsxs(TabsList, {
				variant: "line",
				children: [
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "day",
						children: "Day"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "week",
						children: "Week"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "month",
						children: "Month"
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/docs/demos/textarea.tsx
var textarea_exports = /* @__PURE__ */ __exportAll({ default: () => TextareaDemo });
function TextareaDemo() {
	return /* @__PURE__ */ jsxs(Field, {
		className: "w-full max-w-md",
		children: [
			/* @__PURE__ */ jsx(FieldLabel, {
				htmlFor: "ta-brief",
				children: "Brief for the agent"
			}),
			/* @__PURE__ */ jsx(Textarea, {
				id: "ta-brief",
				placeholder: "Who is the client, what do they need, and what does a good answer look like?",
				className: "min-h-28"
			}),
			/* @__PURE__ */ jsx(FieldDescription, { children: "Two or three sentences is enough." })
		]
	});
}
//#endregion
//#region src/components/ui/toast.tsx
var toast$1 = Toast.createToastManager();
Toast.createToastManager;
Toast.useToastManager;
//#endregion
//#region src/docs/demos/toast.tsx
var toast_exports = /* @__PURE__ */ __exportAll({ default: () => ToastDemo });
function ToastDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-center gap-3",
		children: [/* @__PURE__ */ jsx(Button$1, {
			variant: "glass",
			onClick: () => toast$1.add({
				title: "Run finished",
				description: "Proposal writer drafted 6 pages in 48 seconds."
			}),
			children: "Show toast"
		}), /* @__PURE__ */ jsx(Button$1, {
			variant: "outline",
			onClick: () => toast$1.add({
				title: "Connection expired",
				description: "Reconnect Salesforce in Settings to keep syncing."
			}),
			children: "Show warning"
		})]
	});
}
//#endregion
//#region src/components/ui/toggle.tsx
var toggleVariants = cva("cn-toggle group/toggle inline-flex items-center justify-center whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "cn-toggle-variant-default",
			outline: "cn-toggle-variant-outline"
		},
		size: {
			default: "cn-toggle-size-default",
			sm: "cn-toggle-size-sm",
			lg: "cn-toggle-size-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Toggle$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Toggle, {
		"data-slot": "toggle",
		className: cn(toggleVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region src/components/ui/toggle-group.tsx
var ToggleGroupContext = React.createContext({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal"
});
function ToggleGroup$1({ className, variant, size, spacing = 2, orientation = "horizontal", children, ...props }) {
	return /* @__PURE__ */ jsx(ToggleGroup, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		"data-orientation": orientation,
		style: { "--gap": spacing },
		className: cn("cn-toggle-group group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch", className),
		...props,
		children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing,
				orientation
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant = "default", size = "default", ...props }) {
	const context = React.useContext(ToggleGroupContext);
	return /* @__PURE__ */ jsx(Toggle, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn("cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t", toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
}
//#endregion
//#region src/docs/demos/toggle-group.tsx
var toggle_group_exports = /* @__PURE__ */ __exportAll({ default: () => ToggleGroupDemo });
function ToggleGroupDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-6",
		children: [/* @__PURE__ */ jsxs(ToggleGroup$1, {
			defaultValue: ["left"],
			variant: "outline",
			spacing: 0,
			children: [
				/* @__PURE__ */ jsx(ToggleGroupItem, {
					value: "left",
					"aria-label": "Align left",
					children: /* @__PURE__ */ jsx(AlignLeftIcon, {})
				}),
				/* @__PURE__ */ jsx(ToggleGroupItem, {
					value: "center",
					"aria-label": "Align centre",
					children: /* @__PURE__ */ jsx(AlignCenterIcon, {})
				}),
				/* @__PURE__ */ jsx(ToggleGroupItem, {
					value: "right",
					"aria-label": "Align right",
					children: /* @__PURE__ */ jsx(AlignRightIcon, {})
				})
			]
		}), /* @__PURE__ */ jsxs(ToggleGroup$1, {
			multiple: true,
			defaultValue: ["sales", "ops"],
			children: [
				/* @__PURE__ */ jsx(ToggleGroupItem, {
					value: "sales",
					children: "Sales"
				}),
				/* @__PURE__ */ jsx(ToggleGroupItem, {
					value: "delivery",
					children: "Delivery"
				}),
				/* @__PURE__ */ jsx(ToggleGroupItem, {
					value: "ops",
					children: "Operations"
				})
			]
		})]
	});
}
//#endregion
//#region src/docs/demos/toggle.tsx
var toggle_exports = /* @__PURE__ */ __exportAll({ default: () => ToggleDemo });
function ToggleDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ jsx(Toggle$1, {
				"aria-label": "Bold",
				children: /* @__PURE__ */ jsx(BoldIcon, {})
			}),
			/* @__PURE__ */ jsx(Toggle$1, {
				"aria-label": "Italic",
				variant: "outline",
				children: /* @__PURE__ */ jsx(ItalicIcon, {})
			}),
			/* @__PURE__ */ jsxs(Toggle$1, {
				defaultPressed: true,
				variant: "outline",
				children: [/* @__PURE__ */ jsx(PinIcon, {}), "Pinned"]
			})
		]
	});
}
//#endregion
//#region src/docs/demos/tooltip.tsx
var tooltip_exports = /* @__PURE__ */ __exportAll({ default: () => TooltipDemo });
function TooltipDemo() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			render: /* @__PURE__ */ jsx(Button$1, {
				variant: "glass",
				size: "icon",
				"aria-label": "Improve with AI"
			}),
			children: /* @__PURE__ */ jsx(SparklesIcon, {})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: "Improve with AI" })] }), /* @__PURE__ */ jsxs(Tooltip$1, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			render: /* @__PURE__ */ jsx(Button$1, {
				variant: "outline",
				size: "icon",
				"aria-label": "Copy link"
			}),
			children: /* @__PURE__ */ jsx(CopyIcon, {})
		}), /* @__PURE__ */ jsxs(TooltipContent, { children: ["Copy link ", /* @__PURE__ */ jsx(Kbd, { children: "⌘C" })] })] })]
	});
}
//#endregion
//#region src/components/ui/trace.tsx
function Trace({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "trace",
		className: cn("cn-trace flex w-full min-w-0 flex-col *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none", className),
		...props
	});
}
function TraceLine({ className, status, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "trace-line",
		"data-status": status,
		className: cn("cn-trace-line flex w-fit max-w-full min-w-0 items-center text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer", className),
		...props
	});
}
function TraceIcon({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "trace-icon",
		"aria-hidden": "true",
		className: cn("cn-trace-icon flex shrink-0 items-center justify-center [&_svg]:pointer-events-none", className),
		...props
	});
}
function TraceTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "trace-title",
		className: cn("cn-trace-title min-w-0 truncate motion-reduce:shimmer-none", className),
		...props
	});
}
function TraceCollapsible({ className, ...props }) {
	return /* @__PURE__ */ jsx(Collapsible$1, {
		"data-slot": "trace-collapsible",
		className: cn("cn-trace-collapsible flex w-full min-w-0 flex-col", className),
		...props
	});
}
function TraceCollapsibleTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(CollapsibleTrigger, {
		"data-slot": "trace-collapsible-trigger",
		className: cn("cn-trace-collapsible-trigger group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-status=error]]:text-destructive", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(TraceIcon, {
			className: "transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90",
			children: /* @__PURE__ */ jsx(IconPlaceholder, {
				lucide: "ChevronRightIcon",
				tabler: "IconChevronRight",
				hugeicons: "ArrowRight01Icon",
				phosphor: "CaretRightIcon",
				remixicon: "RiArrowRightSLine"
			})
		})]
	});
}
function TraceCollapsibleContent({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(CollapsibleContent, {
		"data-slot": "trace-collapsible-content",
		className: "cn-trace-collapsible-content h-(--collapsible-panel-height) min-w-0 overflow-hidden transition-[height] data-ending-style:h-0 data-starting-style:h-0",
		...props,
		children: /* @__PURE__ */ jsx("div", {
			"data-slot": "trace-collapsible-content-inner",
			className: cn("cn-trace-collapsible-content-inner min-w-0 wrap-break-word text-muted-foreground", className),
			children
		})
	});
}
//#endregion
//#region src/docs/demos/trace.tsx
var trace_exports = /* @__PURE__ */ __exportAll({ default: () => TraceDemo });
function TraceDemo() {
	return /* @__PURE__ */ jsx("div", {
		className: "glass w-full max-w-md rounded-3xl border p-5",
		children: /* @__PURE__ */ jsxs(Trace, { children: [
			/* @__PURE__ */ jsxs(TraceLine, { children: [/* @__PURE__ */ jsx(TraceIcon, { children: /* @__PURE__ */ jsx(FileSearchIcon, {}) }), /* @__PURE__ */ jsx(TraceTitle, { children: "Read 4 discovery documents" })] }),
			/* @__PURE__ */ jsxs(TraceCollapsible, { children: [/* @__PURE__ */ jsx(TraceCollapsibleTrigger, { children: /* @__PURE__ */ jsxs(TraceLine, { children: [/* @__PURE__ */ jsx(TraceIcon, { children: /* @__PURE__ */ jsx(SquareTerminalIcon, {}) }), /* @__PURE__ */ jsx(TraceTitle, { children: "Queried the rate card" })] }) }), /* @__PURE__ */ jsx(TraceCollapsibleContent, { children: /* @__PURE__ */ jsx(CodeBlock, {
				size: "sm",
				children: /* @__PURE__ */ jsx(CodeBlockContent, {
					wrap: true,
					children: "tier: 2\nseats: 1,200\nbase_rate: 41.60 / seat"
				})
			}) })] }),
			/* @__PURE__ */ jsxs(TraceLine, {
				status: "running",
				children: [/* @__PURE__ */ jsx(TraceIcon, { children: /* @__PURE__ */ jsx(GlobeIcon, {}) }), /* @__PURE__ */ jsx(TraceTitle, { children: "Checking the client's latest annual report" })]
			})
		] })
	});
}
//#endregion
//#region src/docs/demos/typography.tsx
var typography_exports = /* @__PURE__ */ __exportAll({ default: () => TypographyDemo });
function TypographyDemo() {
	return /* @__PURE__ */ jsxs("article", {
		className: "glass w-full max-w-xl rounded-3xl border p-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-semibold tracking-[-0.035em] text-balance",
				children: "Agents that do the work."
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-3 text-lg leading-relaxed",
				children: "A short lead paragraph sets up the page in one or two sentences."
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-8 text-2xl font-semibold tracking-[-0.025em]",
				children: "How a run works"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-3 leading-7",
				children: [
					"Each run reads your inputs, calls the tools it is allowed to use, and writes its output to the place you chose. You can see every step in the ",
					/* @__PURE__ */ jsx("code", {
						className: "bg-muted rounded-md px-1.5 py-0.5 font-mono text-[0.85em]",
						children: "Trace"
					}),
					" view."
				]
			}),
			/* @__PURE__ */ jsxs("ul", {
				className: "mt-4 ml-5 list-disc space-y-1.5 leading-7",
				children: [
					/* @__PURE__ */ jsx("li", { children: "Inputs stay in your workspace." }),
					/* @__PURE__ */ jsx("li", { children: "Tools need an owner's approval." }),
					/* @__PURE__ */ jsx("li", { children: "Outputs are versioned." })
				]
			}),
			/* @__PURE__ */ jsx("blockquote", {
				className: "border-primary mt-6 border-l-2 pl-4 italic",
				children: "\"We cut proposal time from two days to an afternoon.\""
			})
		]
	});
}
//#endregion
//#region src/docs/registry.ts
var COMPONENTS = [
	{
		slug: "accordion",
		name: "Accordion",
		description: "Stacked sections that expand one at a time or all together. Good for FAQs and settings groups.",
		base: "accordion"
	},
	{
		slug: "alert",
		name: "Alert",
		description: "An inline message that calls attention to something the person should know before they continue."
	},
	{
		slug: "alert-dialog",
		name: "Alert Dialog",
		description: "A blocking confirmation for actions that cannot be undone. Always names the action on the button.",
		base: "alert-dialog",
		glass: true
	},
	{
		slug: "aspect-ratio",
		name: "Aspect Ratio",
		description: "Keeps media at a fixed ratio while the layout around it changes."
	},
	{
		slug: "attachment",
		name: "Attachment",
		description: "A file or image chip for composers, messages and upload lists.",
		isNew: true
	},
	{
		slug: "avatar",
		name: "Avatar",
		description: "A person or team, with image, initials fallback, status badge and stacked groups.",
		base: "avatar"
	},
	{
		slug: "badge",
		name: "Badge",
		description: "A short label for status or category. Use tone for meaning, not decoration.",
		glass: true
	},
	{
		slug: "breadcrumb",
		name: "Breadcrumb",
		description: "Shows where a page sits in the hierarchy and links back up it."
	},
	{
		slug: "bubble",
		name: "Bubble",
		description: "A chat message surface for people and assistants, with grouped and reaction states.",
		isNew: true,
		glass: true
	},
	{
		slug: "button",
		name: "Button",
		description: "Triggers an action. One primary per view; glass for actions that sit on imagery or colour.",
		base: "button",
		glass: true
	},
	{
		slug: "button-group",
		name: "Button Group",
		description: "Related actions joined into one control, with optional separators and text."
	},
	{
		slug: "calendar",
		name: "Calendar",
		description: "Pick a date or a range from a month grid.",
		lib: {
			name: "React DayPicker",
			url: "https://daypicker.dev"
		}
	},
	{
		slug: "card",
		name: "Card",
		description: "Groups one piece of content and its actions. Solid by default, glass over imagery.",
		glass: true
	},
	{
		slug: "carousel",
		name: "Carousel",
		description: "Swipeable slides with previous and next controls.",
		lib: {
			name: "Embla Carousel",
			url: "https://www.embla-carousel.com"
		}
	},
	{
		slug: "chart",
		name: "Chart",
		description: "Recharts wrappers that read colours from your theme's chart tokens.",
		lib: {
			name: "Recharts",
			url: "https://recharts.org"
		}
	},
	{
		slug: "checkbox",
		name: "Checkbox",
		description: "Turns an option on or off within a set. Supports an indeterminate state.",
		base: "checkbox"
	},
	{
		slug: "code-block",
		name: "Code Block",
		description: "Formatted code with a header, copy action, line numbers and diff lines.",
		isNew: true
	},
	{
		slug: "collapsible",
		name: "Collapsible",
		description: "Shows and hides one region of content.",
		base: "collapsible"
	},
	{
		slug: "combobox",
		name: "Combobox",
		description: "A text input with a filtered list of options. Supports multiple chips.",
		base: "combobox",
		glass: true
	},
	{
		slug: "command",
		name: "Command",
		description: "A keyboard-first search and action menu, inline or in a dialog.",
		lib: {
			name: "cmdk",
			url: "https://cmdk.paco.me"
		},
		glass: true
	},
	{
		slug: "context-menu",
		name: "Context Menu",
		description: "Actions for an element, opened with right-click or long press.",
		base: "context-menu",
		glass: true
	},
	{
		slug: "data-table",
		name: "Data Table",
		description: "A sortable, selectable table built from Table, Checkbox and Dropdown Menu.",
		file: null
	},
	{
		slug: "date-picker",
		name: "Date Picker",
		description: "A button that opens a Calendar in a Popover.",
		file: null,
		glass: true
	},
	{
		slug: "dialog",
		name: "Dialog",
		description: "A focused task on top of the page. One primary action, aligned right.",
		base: "dialog",
		glass: true
	},
	{
		slug: "direction",
		name: "Direction",
		description: "Sets left-to-right or right-to-left for everything inside it.",
		base: "direction-provider"
	},
	{
		slug: "drawer",
		name: "Drawer",
		description: "A panel that slides up from the bottom edge. Best on touch screens.",
		base: "drawer",
		glass: true
	},
	{
		slug: "dropdown-menu",
		name: "Dropdown Menu",
		description: "A list of actions or options opened from a trigger.",
		base: "menu",
		glass: true
	},
	{
		slug: "empty",
		name: "Empty",
		description: "What a view shows before it has content, with the next step to take."
	},
	{
		slug: "field",
		name: "Field",
		description: "Label, control, description and error laid out together and wired for accessibility.",
		base: "field"
	},
	{
		slug: "hover-card",
		name: "Hover Card",
		description: "A preview that appears when the pointer rests on a link.",
		base: "preview-card",
		glass: true
	},
	{
		slug: "input",
		name: "Input",
		description: "A single-line text field.",
		base: "input"
	},
	{
		slug: "input-group",
		name: "Input Group",
		description: "An input with icons, text or buttons attached to its edges."
	},
	{
		slug: "input-otp",
		name: "Input OTP",
		description: "One-time code entry split into slots.",
		lib: {
			name: "input-otp",
			url: "https://input-otp.rodz.dev"
		}
	},
	{
		slug: "item",
		name: "Item",
		description: "A flexible row with media, title, description and actions. The building block for lists."
	},
	{
		slug: "kbd",
		name: "Kbd",
		description: "Shows a key or shortcut."
	},
	{
		slug: "label",
		name: "Label",
		description: "Names a form control."
	},
	{
		slug: "marker",
		name: "Marker",
		description: "A small inline status line, for steps, activity and system notes.",
		isNew: true
	},
	{
		slug: "menubar",
		name: "Menubar",
		description: "A desktop-style row of menus for dense tools.",
		base: "menubar",
		glass: true
	},
	{
		slug: "message",
		name: "Message",
		description: "Lays out a chat turn: avatar, header, bubbles and footer.",
		isNew: true
	},
	{
		slug: "message-scroller",
		name: "Message Scroller",
		description: "A chat transcript that stays pinned to the newest message.",
		isNew: true
	},
	{
		slug: "native-select",
		name: "Native Select",
		description: "The browser's own select, styled to match. Best on mobile."
	},
	{
		slug: "navigation-menu",
		name: "Navigation Menu",
		description: "Top-level site navigation with rich dropdown panels.",
		base: "navigation-menu",
		glass: true
	},
	{
		slug: "pagination",
		name: "Pagination",
		description: "Moves between pages of results."
	},
	{
		slug: "popover",
		name: "Popover",
		description: "Floating content anchored to a trigger, for small forms and details.",
		base: "popover",
		glass: true
	},
	{
		slug: "progress",
		name: "Progress",
		description: "Shows how far a task has come.",
		base: "progress"
	},
	{
		slug: "questionnaire",
		name: "Questionnaire",
		description: "A step-by-step set of questions, for agents that need input before acting.",
		isNew: true
	},
	{
		slug: "radio-group",
		name: "Radio Group",
		description: "Choose exactly one option from a short list.",
		base: "radio-group"
	},
	{
		slug: "resizable",
		name: "Resizable",
		description: "Panels the person can drag to resize.",
		lib: {
			name: "react-resizable-panels",
			url: "https://github.com/bvaughn/react-resizable-panels"
		}
	},
	{
		slug: "scroll-area",
		name: "Scroll Area",
		description: "Native scrolling with a slim glass scrollbar that fades in while you scroll.",
		base: "scroll-area",
		glass: true
	},
	{
		slug: "select",
		name: "Select",
		description: "Choose one option from a list in a floating panel.",
		base: "select",
		glass: true
	},
	{
		slug: "separator",
		name: "Separator",
		description: "A quiet line between groups of content.",
		base: "separator"
	},
	{
		slug: "sheet",
		name: "Sheet",
		description: "A side panel for secondary tasks and filters.",
		base: "dialog",
		glass: true
	},
	{
		slug: "sidebar",
		name: "Sidebar",
		description: "App navigation that collapses to icons and becomes a sheet on mobile.",
		glass: true
	},
	{
		slug: "skeleton",
		name: "Skeleton",
		description: "A placeholder shape while content loads."
	},
	{
		slug: "slider",
		name: "Slider",
		description: "Pick a value or range by dragging.",
		base: "slider"
	},
	{
		slug: "sonner",
		name: "Sonner",
		description: "Stacked toast notifications with promise and action support.",
		lib: {
			name: "Sonner",
			url: "https://sonner.emilkowal.ski"
		}
	},
	{
		slug: "spinner",
		name: "Spinner",
		description: "A small indicator for work in progress. Pair it with text that says what is happening."
	},
	{
		slug: "switch",
		name: "Switch",
		description: "Turns a setting on or off immediately.",
		base: "switch"
	},
	{
		slug: "table",
		name: "Table",
		description: "Rows and columns of data."
	},
	{
		slug: "tabs",
		name: "Tabs",
		description: "Switch between views of the same subject. Line, filled and glass styles.",
		base: "tabs",
		glass: true
	},
	{
		slug: "textarea",
		name: "Textarea",
		description: "Multi-line text entry."
	},
	{
		slug: "toast",
		name: "Toast",
		description: "Brief feedback after an action, on thick glass.",
		base: "toast",
		glass: true
	},
	{
		slug: "toggle",
		name: "Toggle",
		description: "A two-state button, like bold in a text editor.",
		base: "toggle"
	},
	{
		slug: "toggle-group",
		name: "Toggle Group",
		description: "A set of toggles where one or many can be on.",
		base: "toggle-group"
	},
	{
		slug: "tooltip",
		name: "Tooltip",
		description: "A short label on hover or focus. Never the only place key information lives.",
		base: "tooltip",
		glass: true
	},
	{
		slug: "trace",
		name: "Trace",
		description: "Shows what an agent did: steps, tool calls and reasoning, collapsible.",
		isNew: true
	},
	{
		slug: "typography",
		name: "Typography",
		description: "Headings, body, lists, quotes and inline code in the theme's type.",
		file: null
	}
];
//#endregion
//#region scripts/render-markup.tsx
var mods = /* #__PURE__ */ Object.assign({
	"../src/docs/demos/accordion.tsx": accordion_exports,
	"../src/docs/demos/alert-dialog.tsx": alert_dialog_exports,
	"../src/docs/demos/alert.tsx": alert_exports,
	"../src/docs/demos/aspect-ratio.tsx": aspect_ratio_exports,
	"../src/docs/demos/attachment.tsx": attachment_exports,
	"../src/docs/demos/avatar.tsx": avatar_exports,
	"../src/docs/demos/badge.tsx": badge_exports,
	"../src/docs/demos/breadcrumb.tsx": breadcrumb_exports,
	"../src/docs/demos/bubble.tsx": bubble_exports,
	"../src/docs/demos/button-group.tsx": button_group_exports,
	"../src/docs/demos/button.tsx": button_exports,
	"../src/docs/demos/calendar.tsx": calendar_exports,
	"../src/docs/demos/card.tsx": card_exports,
	"../src/docs/demos/carousel.tsx": carousel_exports,
	"../src/docs/demos/chart.tsx": chart_exports,
	"../src/docs/demos/checkbox.tsx": checkbox_exports,
	"../src/docs/demos/code-block.tsx": code_block_exports,
	"../src/docs/demos/collapsible.tsx": collapsible_exports,
	"../src/docs/demos/combobox.tsx": combobox_exports,
	"../src/docs/demos/command.tsx": command_exports,
	"../src/docs/demos/context-menu.tsx": context_menu_exports,
	"../src/docs/demos/data-table.tsx": data_table_exports,
	"../src/docs/demos/date-picker.tsx": date_picker_exports,
	"../src/docs/demos/dialog.tsx": dialog_exports,
	"../src/docs/demos/direction.tsx": direction_exports,
	"../src/docs/demos/drawer.tsx": drawer_exports,
	"../src/docs/demos/dropdown-menu.tsx": dropdown_menu_exports,
	"../src/docs/demos/empty.tsx": empty_exports,
	"../src/docs/demos/field.tsx": field_exports,
	"../src/docs/demos/hover-card.tsx": hover_card_exports,
	"../src/docs/demos/input-group.tsx": input_group_exports,
	"../src/docs/demos/input-otp.tsx": input_otp_exports,
	"../src/docs/demos/input.tsx": input_exports,
	"../src/docs/demos/item.tsx": item_exports,
	"../src/docs/demos/kbd.tsx": kbd_exports,
	"../src/docs/demos/label.tsx": label_exports,
	"../src/docs/demos/marker.tsx": marker_exports,
	"../src/docs/demos/menubar.tsx": menubar_exports,
	"../src/docs/demos/message-scroller.tsx": message_scroller_exports,
	"../src/docs/demos/message.tsx": message_exports,
	"../src/docs/demos/native-select.tsx": native_select_exports,
	"../src/docs/demos/navigation-menu.tsx": navigation_menu_exports,
	"../src/docs/demos/pagination.tsx": pagination_exports,
	"../src/docs/demos/popover.tsx": popover_exports,
	"../src/docs/demos/progress.tsx": progress_exports,
	"../src/docs/demos/questionnaire.tsx": questionnaire_exports,
	"../src/docs/demos/radio-group.tsx": radio_group_exports,
	"../src/docs/demos/resizable.tsx": resizable_exports,
	"../src/docs/demos/scroll-area.tsx": scroll_area_exports,
	"../src/docs/demos/select.tsx": select_exports,
	"../src/docs/demos/separator.tsx": separator_exports,
	"../src/docs/demos/sheet.tsx": sheet_exports,
	"../src/docs/demos/sidebar.tsx": sidebar_exports,
	"../src/docs/demos/skeleton.tsx": skeleton_exports,
	"../src/docs/demos/slider.tsx": slider_exports,
	"../src/docs/demos/sonner.tsx": sonner_exports,
	"../src/docs/demos/spinner.tsx": spinner_exports,
	"../src/docs/demos/switch.tsx": switch_exports,
	"../src/docs/demos/table.tsx": table_exports,
	"../src/docs/demos/tabs.tsx": tabs_exports,
	"../src/docs/demos/textarea.tsx": textarea_exports,
	"../src/docs/demos/toast.tsx": toast_exports,
	"../src/docs/demos/toggle-group.tsx": toggle_group_exports,
	"../src/docs/demos/toggle.tsx": toggle_exports,
	"../src/docs/demos/tooltip.tsx": tooltip_exports,
	"../src/docs/demos/trace.tsx": trace_exports,
	"../src/docs/demos/typography.tsx": typography_exports
});
function render() {
	const out = {};
	for (const c of COMPONENTS) {
		const m = mods[`../src/docs/demos/${c.slug}.tsx`];
		if (!m) continue;
		try {
			out[c.slug] = renderToStaticMarkup(createElement(m.default));
		} catch (e) {
			out[c.slug] = `<!-- could not render statically: ${e.message} -->`;
		}
	}
	return {
		out,
		meta: COMPONENTS.map((c) => ({
			slug: c.slug,
			name: c.name,
			description: c.description,
			base: c.base
		}))
	};
}
//#endregion
export { render };
