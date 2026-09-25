import React from "react";

type Palette = {
    name: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        accent?: string;
    };
};

const palettes: Palette[] = [
    {
        name: "Executive Tech",
        description: "Modern, sleek, professional, and tech-forward.",
        colors: {
            primary: "#0A2A1A",
            secondary: "#7A9A82",
            background: "#F4F7F5",
            surface: "#FFFFFF",
            text: "#2B2B2B",
        },
    },
    {
        name: "Creative & Organic",
        description: "Warm, natural, and expressive for creative professionals.",
        colors: {
            primary: "#1E352F",
            secondary: "#93A293",
            background: "#FAF9F5",
            surface: "#FFFFFF",
            text: "#1A1A1A",
            accent: "#D4AF37",
        },
    },
    {
        name: "Minimalist Corporate",
        description: "Restrained and polished for traditional corporate fields.",
        colors: {
            primary: "#0D2421",
            secondary: "#607D70",
            background: "#EAEFEF",
            surface: "#FAFAFA",
            text: "#1E293B",
        },
    },
    {
        name: "High-Conversion SaaS",
        description: "Product-focused with a strong conversion accent.",
        colors: {
            primary: "#112A24",
            secondary: "#A3B899",
            background: "#F1F5F2",
            surface: "#FFFFFF",
            text: "#1C2925",
            accent: "#E07A5F",
        },
    },
];

const ResumePreview = ({ palette }: { palette: Palette }) => {
    const { primary, secondary, surface, text, accent } = palette.colors;

    return (
        <div
            className="w-full max-w-[430px] overflow-hidden rounded-lg shadow-2xl"
            style={{ backgroundColor: surface, color: text }}
        >
            {/* Resume Header */}
            <div
                className="px-7 py-6"
                style={{ backgroundColor: primary, color: "#FFFFFF" }}
            >
                <h3 className="text-2xl font-bold tracking-tight">Alex Morgan</h3>

                <p
                    className="mt-1 text-sm"
                    style={{ color: secondary === "#93A293" ? "#D8DED8" : secondary }}
                >
                    Product Designer
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-white/75">
                    <span>alex@example.com</span>
                    <span>•</span>
                    <span>San Francisco, CA</span>
                </div>
            </div>

            {/* Resume Content */}
            <div className="space-y-5 p-7">
                <section>
                    <SectionTitle color={primary}>Profile</SectionTitle>

                    <p className="mt-2 text-[11px] leading-relaxed opacity-75">
                        Product designer with 6+ years of experience creating intuitive
                        digital products and scalable design systems for growing teams.
                    </p>
                </section>

                <section>
                    <SectionTitle color={primary}>Experience</SectionTitle>

                    <div className="mt-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h4 className="text-xs font-bold">Senior Product Designer</h4>
                                <p
                                    className="mt-0.5 text-[10px] font-medium"
                                    style={{ color: secondary }}
                                >
                                    Northstar Labs
                                </p>
                            </div>

                            <span className="text-[9px] opacity-50">2022 — Present</span>
                        </div>

                        <p className="mt-2 text-[10px] leading-relaxed opacity-70">
                            Led end-to-end product design across web and mobile experiences,
                            improving activation and reducing user friction.
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h4 className="text-xs font-bold">Product Designer</h4>
                                <p
                                    className="mt-0.5 text-[10px] font-medium"
                                    style={{ color: secondary }}
                                >
                                    Acme Digital
                                </p>
                            </div>

                            <span className="text-[9px] opacity-50">2019 — 2022</span>
                        </div>

                        <p className="mt-2 text-[10px] leading-relaxed opacity-70">
                            Designed customer-facing products and collaborated with
                            engineering and product teams.
                        </p>
                    </div>
                </section>

                <section>
                    <SectionTitle color={primary}>Skills</SectionTitle>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {["Figma", "UX Design", "Research", "Prototyping"].map(
                            (skill) => (
                                <span
                                    key={skill}
                                    className="rounded px-2 py-1 text-[9px] font-medium"
                                    style={{
                                        backgroundColor: `${secondary}22`,
                                        color: primary,
                                    }}
                                >
                                    {skill}
                                </span>
                            )
                        )}
                    </div>
                </section>

                {accent && (
                    <div
                        className="rounded-md px-3 py-2 text-[9px] font-semibold"
                        style={{
                            backgroundColor: `${accent}18`,
                            color: accent,
                        }}
                    >
                        Featured portfolio available
                    </div>
                )}
            </div>
        </div>
    );
};

const SectionTitle = ({
    children,
    color,
}: {
    children: React.ReactNode;
    color: string;
}) => {
    return (
        <div>
            <h4
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color }}
            >
                {children}
            </h4>

            <div
                className="mt-1.5 h-[2px] w-8 rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};

const BuilderSidebar = ({ palette }: { palette: Palette }) => {
    const { primary, secondary, background, accent } = palette.colors;

    const steps = [
        "Personal Details",
        "Experience",
        "Education",
        "Skills",
        "Templates",
    ];

    return (
        <div
            className="hidden w-[210px] shrink-0 border-r p-5 md:block"
            style={{
                backgroundColor: `${secondary}18`,
                borderColor: `${secondary}35`,
            }}
        >
            <div className="mb-8 flex items-center gap-2">
                <div
                    className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
                    style={{ backgroundColor: primary }}
                >
                    R
                </div>

                <span
                    className="text-sm font-bold"
                    style={{ color: primary }}
                >
                    Resume
                </span>
            </div>

            <p
                className="mb-3 text-[9px] font-bold uppercase tracking-widest"
                style={{ color: secondary }}
            >
                Build your resume
            </p>

            <div className="space-y-1.5">
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[10px]"
                        style={
                            index === 0
                                ? {
                                    backgroundColor: primary,
                                    color: "#FFFFFF",
                                }
                                : {
                                    color: primary,
                                }
                        }
                    >
                        <span className="opacity-60">{index + 1}</span>
                        {step}
                    </div>
                ))}
            </div>

            <div
                className="mt-8 rounded-lg p-3"
                style={{ backgroundColor: background }}
            >
                <p
                    className="text-[9px] font-semibold"
                    style={{ color: primary }}
                >
                    Resume completion
                </p>

                <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full"
                    style={{ backgroundColor: `${secondary}40` }}
                >
                    <div
                        className="h-full w-[78%] rounded-full"
                        style={{ backgroundColor: accent ?? secondary }}
                    />
                </div>

                <p className="mt-1.5 text-[8px] opacity-50">78% complete</p>
            </div>
        </div>
    );
};

const BuilderTopbar = ({ palette }: { palette: Palette }) => {
    const { primary, surface, accent } = palette.colors;

    return (
        <div
            className="flex h-14 items-center justify-between border-b px-5"
            style={{
                backgroundColor: surface,
                borderColor: `${primary}15`,
            }}
        >
            <div>
                <p
                    className="text-xs font-bold"
                    style={{ color: primary }}
                >
                    My Resume
                </p>

                <p className="text-[9px] opacity-40">Last saved just now</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="rounded-md px-3 py-1.5 text-[9px] font-semibold"
                    style={{
                        border: `1px solid ${primary}25`,
                        color: primary,
                    }}
                >
                    Preview
                </button>

                <button
                    className="rounded-md px-3 py-1.5 text-[9px] font-bold text-white"
                    style={{ backgroundColor: accent ?? primary }}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default function PaletteTester() {
    return (
        <main className="w-full">
            {palettes.map((palette, index) => {
                const { primary, secondary, background, surface, text, accent } =
                    palette.colors;

                return (
                    <section
                        key={palette.name}
                        className="flex min-h-screen w-full items-center justify-center px-5 py-10 md:px-10"
                        style={{
                            backgroundColor: background,
                            color: text,
                        }}
                    >
                        <div className="w-full max-w-6xl">
                            {/* Palette heading */}
                            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-[0.2em]"
                                            style={{ color: secondary }}
                                        >
                                            Palette 0{index + 1}
                                        </span>

                                        {index === 0 && (
                                            <span
                                                className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase"
                                                style={{
                                                    backgroundColor: secondary,
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <h2
                                        className="text-3xl font-bold tracking-tight md:text-4xl"
                                        style={{ color: primary }}
                                    >
                                        {palette.name}
                                    </h2>

                                    <p className="mt-2 max-w-lg text-sm opacity-60">
                                        {palette.description}
                                    </p>
                                </div>

                                {/* Color swatches */}
                                <div className="flex items-center gap-2">
                                    {Object.entries(palette.colors).map(([name, color]) => (
                                        <div key={name} className="group relative">
                                            <div
                                                className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                                                style={{ backgroundColor: color }}
                                                title={`${name}: ${color}`}
                                            />

                                            <span
                                                className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[8px] text-white group-hover:block"
                                            >
                                                {color}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main preview */}
                            <div
                                className="overflow-hidden rounded-xl border shadow-xl"
                                style={{
                                    borderColor: `${primary}18`,
                                    backgroundColor: surface,
                                }}
                            >
                                <BuilderTopbar palette={palette} />

                                <div className="flex min-h-[500px]">
                                    <BuilderSidebar palette={palette} />

                                    {/* Editor */}
                                    <div
                                        className="flex-1 p-5 md:p-8"
                                        style={{ backgroundColor: background }}
                                    >
                                        <div className="mb-5">
                                            <h3
                                                className="text-sm font-bold"
                                                style={{ color: primary }}
                                            >
                                                Resume Editor
                                            </h3>

                                            <p className="mt-1 text-[10px] opacity-50">
                                                Build a professional resume in minutes.
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
                                            {/* Fake form */}
                                            <div className="w-full max-w-sm space-y-3">
                                                {[
                                                    ["Full Name", "Alex Morgan"],
                                                    ["Job Title", "Product Designer"],
                                                    ["Email", "alex@example.com"],
                                                ].map(([label, value]) => (
                                                    <div key={label}>
                                                        <label
                                                            className="mb-1 block text-[9px] font-semibold"
                                                            style={{ color: primary }}
                                                        >
                                                            {label}
                                                        </label>

                                                        <div
                                                            className="rounded-md border px-3 py-2 text-[10px]"
                                                            style={{
                                                                backgroundColor: surface,
                                                                borderColor: `${primary}18`,
                                                                color: text,
                                                            }}
                                                        >
                                                            {value}
                                                        </div>
                                                    </div>
                                                ))}

                                                <button
                                                    className="mt-2 w-full rounded-md py-2.5 text-[10px] font-bold text-white transition-opacity hover:opacity-90"
                                                    style={{
                                                        backgroundColor: accent ?? primary,
                                                    }}
                                                >
                                                    Continue
                                                </button>
                                            </div>

                                            {/* Resume */}
                                            <ResumePreview palette={palette} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hex values */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {Object.entries(palette.colors).map(([name, color]) => (
                                    <div
                                        key={name}
                                        className="rounded-md border px-2.5 py-1.5"
                                        style={{
                                            backgroundColor: surface,
                                            borderColor: `${primary}15`,
                                        }}
                                    >
                                        <span
                                            className="text-[8px] font-semibold uppercase"
                                            style={{ color: secondary }}
                                        >
                                            {name}
                                        </span>

                                        <span className="ml-2 font-mono text-[8px] opacity-60">
                                            {color}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </main>
    );
};
