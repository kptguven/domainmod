import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { makeStyles, mergeClasses } from '@griffel/react';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { canUseDOM } from '@fluentui/react-utilities';
import {
    AddRegular,
    AlertRegular,
    ArrowDownloadRegular,
    ArrowExitRegular,
    ArrowRightRegular,
    ArrowSyncRegular,
    ArrowUploadRegular,
    BookRegular,
    BugRegular,
    CartRegular,
    ChartMultipleRegular,
    CheckmarkCircleRegular,
    CheckmarkRegular,
    ChatRegular,
    ChevronRightRegular,
    CopyRegular,
    CubeRegular,
    DatabaseRegular,
    DismissCircleRegular,
    DismissRegular,
    DocumentRegular,
    FilterRegular,
    GlobeRegular,
    HomeRegular,
    HourglassRegular,
    InfoRegular,
    LockClosedRegular,
    MailRegular,
    NavigationRegular,
    NewsRegular,
    PeopleRegular,
    PersonRegular,
    PersonSupportRegular,
    SearchRegular,
    SettingsRegular,
    ThumbLikeRegular,
    WarningRegular,
    WeatherMoonRegular,
    WrenchRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
    provider: {
        display: 'contents'
    },
    icon: {
        display: 'inline-block',
        width: tokens.fontSizeBase500,
        height: tokens.fontSizeBase500,
        color: 'currentColor',
        flexShrink: 0,
        verticalAlign: 'middle'
    },
    compactIcon: {
        width: tokens.fontSizeBase400,
        height: tokens.fontSizeBase400
    },
    largeIcon: {
        width: tokens.fontSizeHero900,
        height: tokens.fontSizeHero900
    }
});

const icons = {
    home: HomeRegular,
    globe: GlobeRegular,
    hourglass: HourglassRegular,
    lock: LockClosedRegular,
    cube: CubeRegular,
    filter: FilterRegular,
    copy: CopyRegular,
    chart: ChartMultipleRegular,
    database: DatabaseRegular,
    settings: SettingsRegular,
    check: CheckmarkCircleRegular,
    wrench: WrenchRegular,
    book: BookRegular,
    support: PersonSupportRegular,
    news: NewsRegular,
    search: SearchRegular,
    navigation: NavigationRegular,
    dismiss: DismissRegular,
    moon: WeatherMoonRegular,
    person: PersonRegular,
    exit: ArrowExitRegular,
    chevron: ChevronRightRegular,
    download: ArrowDownloadRegular,
    bug: BugRegular,
    cart: CartRegular,
    upload: ArrowUploadRegular,
    chat: ChatRegular,
    checkmark: CheckmarkRegular,
    arrow: ArrowRightRegular,
    dismissCircle: DismissCircleRegular,
    add: AddRegular,
    warning: WarningRegular,
    alert: AlertRegular,
    info: InfoRegular,
    sync: ArrowSyncRegular,
    mail: MailRegular,
    people: PeopleRegular,
    document: DocumentRegular,
    like: ThumbLikeRegular
};

const legacyIcons = {
    'fa-adjust': 'moon',
    'fa-angle-left': 'chevron',
    'fa-arrow-circle-right': 'arrow',
    'fa-arrow-right': 'arrow',
    'fa-bar-chart': 'chart',
    'fa-bars': 'navigation',
    'fa-bell': 'alert',
    'fa-book': 'book',
    'fa-bug': 'bug',
    'fa-check': 'checkmark',
    'fa-circle-disabled': 'chevron',
    'fa-comment': 'chat',
    'fa-cogs': 'settings',
    'fa-copy': 'copy',
    'fa-cubes': 'cube',
    'fa-dashboard': 'home',
    'fa-database': 'database',
    'fa-download': 'download',
    'fa-envelope': 'mail',
    'fa-exclamation-circle': 'alert',
    'fa-exclamation-triangle': 'warning',
    'fa-file': 'document',
    'fa-filter': 'filter',
    'fa-gears': 'settings',
    'fa-hourglass': 'hourglass',
    'fa-hourglass-2': 'hourglass',
    'fa-info': 'info',
    'fa-info-circle': 'info',
    'fa-life-ring': 'support',
    'fa-lock': 'lock',
    'fa-newspaper': 'news',
    'fa-plus': 'add',
    'fa-refresh': 'sync',
    'fa-search': 'search',
    'fa-sign-out-alt': 'exit',
    'fa-sitemap': 'globe',
    'fa-tachometer-alt': 'home',
    'fa-thumbs-up': 'like',
    'fa-times': 'dismiss',
    'fa-times-circle': 'dismissCircle',
    'fa-upload': 'upload',
    'fa-user': 'person',
    'fa-users': 'people',
    'fa-wrench': 'wrench',
    'ion-android-cart': 'cart',
    'ion-checkmark-circled': 'check'
};

function getIconForElement(element) {
    const fluentClass = Array.from(element.classList).find((className) => className.startsWith('fluent-icon--'));
    if (fluentClass) {
        const iconName = fluentClass.slice('fluent-icon--'.length);
        if (icons[iconName]) return icons[iconName];
    }

    for (const className of element.classList) {
        const iconName = legacyIcons[className];
        if (iconName && icons[iconName]) return icons[iconName];
    }

    return null;
}

function IconPortals({ targets, theme }) {
    const styles = useStyles();

    return targets.map(({ element, Icon, compact, large }, index) => createPortal(
        <FluentProvider theme={theme} className={styles.provider}>
            <Icon
                aria-hidden="true"
                className={mergeClasses(
                    'fluent-react-icon',
                    styles.icon,
                    compact && styles.compactIcon,
                    large && styles.largeIcon
                )}
            />
        </FluentProvider>,
        element,
        index
    ));
}

if (canUseDOM()) {
    const targets = Array.from(document.querySelectorAll('.fluent-icon, i[class*="fa-"], span[class*="fa-"], i[class*="ion-"]'))
        .flatMap((element) => {
            const Icon = getIconForElement(element);
            return Icon ? [{
                element,
                Icon,
                compact: element.classList.contains('fluent-icon--chevron') || element.classList.contains('right'),
                large: Boolean(element.closest('.small-box .icon'))
            }] : [];
        });

    if (targets.length > 0) {
        const mountNode = document.createElement('div');
        mountNode.hidden = true;
        document.body.appendChild(mountNode);

        const theme = document.body.classList.contains('dark-mode') ? webDarkTheme : webLightTheme;
        createRoot(mountNode).render(<IconPortals targets={targets} theme={theme} />);
    }
}