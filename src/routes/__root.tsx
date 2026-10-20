import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ClientOnly } from "#/components/ClientOnly";
import { LanguageProvider } from "#/lib/i18n";
import { ensureSession } from "#/server/session";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	loader: () => ensureSession(),
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "RHAI: análise de perfil do LinkedIn para o seu próximo emprego",
			},
			{
				name: "description",
				content:
					"Indique o seu perfil do LinkedIn e o cargo que quer. Em cerca de 30 segundos recebe uma pontuação, uma SWOT feita para esse objetivo e um título, Sobre e experiência reescritos. Pontuação grátis, sem registo.",
			},
			{
				name: "theme-color",
				content: "#faf9f5",
			},
		],
		links: [
			{ rel: "icon", type: "image/svg+xml", href: "/rhai-icon-brand.svg" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body
				className="min-h-screen bg-background text-ink antialiased"
				suppressHydrationWarning
			>
				<LanguageProvider>{children}</LanguageProvider>
				<ClientOnly>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</ClientOnly>
				<Scripts />
			</body>
		</html>
	);
}
