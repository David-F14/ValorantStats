getWeaponImg<script>
import axios from "axios";
import _ from "lodash";

export default {
    props: ["uuid"],
    data() {
        return {
            weapon: {},
            currentSkin : {},
            currentChroma : {},
            badSkin: "https://media.valorant-api.com/weaponskins/27f21d97-4c4b-bd1c-1f08-31830ab0be84/displayicon.png",
        };
    },
    methods: {
        getInfoWeapon(uuid) {
            return axios.get("https://valorant-api.com/v1/weapons/" + uuid.toString(), {
                params: { language: "fr-FR" },
            });
        },

        setCurrentSkin(skin) {
            this.currentSkin = skin;
            this.setCurrentChroma(this.weaponChromas.length > 1 ? this.weaponChromas[0] : {});
        },

        setCurrentChroma(chroma) {
            this.currentChroma = chroma;
        },

        objIsEmpty(obj){
            return _.isEmpty(obj);
        },

        getWeaponName() {
            if (!this.objIsEmpty(this.currentChroma))
                return this.currentChroma.displayName
            else if (!this.objIsEmpty(this.currentSkin))
                return this.currentSkin.displayName
            else 
                return this.weapon.displayName;
        },

        getWeaponImg() {
            if (!this.objIsEmpty(this.currentChroma))
                return this.currentChroma.fullRender
            else if (!this.objIsEmpty(this.currentSkin))
                return this.currentSkin.displayIcon
            else 
                return this.weapon.displayIcon;
        }
    },

    mounted() {
        this.getInfoWeapon(this.uuid).then((res) => {
            this.weapon = res.data.data;
            console.log("weapon", this.weapon);
        });
    },

    computed: {
        weaponDamageRange() {
            return this.weapon?.weaponStats?.damageRanges[0];
        },

        weaponAdsStats() {
            return this.weapon?.weaponStats?.adsStats;
        },

        weaponSkins() {
            return this.weapon?.skins?.filter((s) => s.displayIcon != null && s.displayIcon != this.badSkin);
        },

        weaponChromas() {
            return this.currentSkin?.chromas;
        }
    },
};
</script>

<template>
    <div class="weapon-grid">
        <div class="weapon">
            <div class="weapon__stage">
                <div class="weapon__details">
                    <h1 class="weapon__name">{{ this.getWeaponName() }}</h1>
                    <span class="weapon__type">{{ weapon?.shopData?.category }} - {{ weapon?.shopData?.categoryText }}</span>
                </div>
                <span class="weapon__cost"
                    ><svg viewBox="0 0 48 48" class="weapon__cost-icon">
                        <path
                            fill-rule="evenodd"
                            d="M7.998 13.549v-5.55h5.334v3.34l1.656 1.657A14.164 14.164 0 0 1 24 9.777c3.42 0 6.558 1.207 9.011 3.218l1.656-1.656V8H40v5.55l-3.558 3.557A14.158 14.158 0 0 1 38.223 24c0 2.501-.646 4.852-1.78 6.894l3.558 3.557v5.55h-5.334v-3.34l-1.656-1.656A14.164 14.164 0 0 1 24 38.223c-3.42 0-6.558-1.207-9.012-3.219l-1.656 1.657V40H7.998v-5.55l3.558-3.558A14.16 14.16 0 0 1 9.777 24c0-2.501.646-4.851 1.78-6.893l-3.559-3.558ZM24 32.889a8.89 8.89 0 1 0 0-17.778 8.89 8.89 0 0 0 0 17.778Z"
                            clip-rule="evenodd"></path>
                    </svg>
                    {{ weapon?.shopData?.cost }}
                </span>
                <div  class="weapon__theme">
                    <img
                        src="https://titles.trackercdn.com/valorant-api/themes/92d4ccf0-446f-db43-f028-4a9f4bc2714c/displayicon.png"
                        title="Araxys"
                        alt="Araxys Icon"
                        class="weapon__theme-icon" />
                </div>
                <div  class="weapon__chromas">
                    <div v-if="this.weaponChromas?.length > 1" v-for="chroma in this.weaponChromas" class="weapon__chroma" 
                    :class="{ 'weapon__chroma--active': chroma == currentChroma }" 
                    @click="setCurrentChroma(chroma)">
                        <img :src="chroma.swatch" />
                    </div>
                </div>
                <img class="weapon__image"
                    :src="this.getWeaponImg()"  
                    :class="{pistol : weapon.category == 'EEquippableCategory::Sidearm'}" />
            </div>
            <div class="skins">
                <a v-for="skin in weaponSkins" class="skin" @click="setCurrentSkin(skin)" :class="{ 'skin--active': skin == currentSkin }"
                    ><img :src="skin.displayIcon" />
                </a>
            </div>
        </div>
        <div class="stats">
            <h2 class="stats__header">Weapon Stats</h2>
            <div class="stats__section">
                <dl class="stats__mode">
                    <dt>Magazine Size</dt>
                    <dd>{{ weapon?.weaponStats?.magazineSize }}</dd>
                    <dt>Equip Time</dt>
                    <dd>{{ weapon?.weaponStats?.equipTimeSeconds }} sec</dd>
                    <dt>Reload Time</dt>
                    <dd>{{ weapon?.weaponStats?.reloadTimeSeconds }} sec</dd>
                    <dt>Wall Penetration</dt>
                    <dd aria-label="Medium">
                        <div aria-hidden="true" class="wall-penetration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" class="wall-penetration__icon">
                                <path
                                    id="wall"
                                    fill="#7399bf"
                                    d="M18.07 21.629V6.537L3.761 0 .07 2.371v15.092L14.38 24Zm-1.5-.854-1.5.964V9.778l1.5-.964ZM3.88 1.741l12.2 5.571-1.82 1.167L2.064 2.908ZM1.57 4.37l12 5.482v12.091l-12-5.482Zm0 0"
                                    transform="translate(-.07)"></path>
                            </svg>
                            <div class="wall-penetration__progress">
                                <div class="wall-penetration__fill" style="width: 66%"></div>
                                <span
                                    class="wall-penetration__label"
                                    :class="{
                                        'wall-penetration__label--active':
                                            weapon?.weaponStats?.wallPenetration == 'EWallPenetrationDisplayType::Low',
                                    }"
                                    >Low</span
                                >
                                <span
                                    class="wall-penetration__label"
                                    :class="{
                                        'wall-penetration__label--active':
                                            weapon?.weaponStats?.wallPenetration == 'EWallPenetrationDisplayType::Medium',
                                    }"
                                    >Medium</span
                                >
                                <span
                                    class="wall-penetration__label"
                                    :class="{
                                        'wall-penetration__label--active':
                                            weapon?.weaponStats?.wallPenetration == 'EWallPenetrationDisplayType::High',
                                    }"
                                    >High
                                </span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" class="wall-penetration__icon">
                                <g id="Group_1660" data-name="Group 1660" transform="translate(-606 -371)">
                                    <g id="Group_1656" data-name="Group 1656" transform="translate(219)">
                                        <path
                                            id="wall"
                                            fill="#7399bf"
                                            d="M18.07 21.629V6.537L3.761 0 .07 2.371v15.092L14.38 24Zm-1.5-.854-1.5.964V9.778l1.5-.964ZM3.88 1.741l12.2 5.571-1.82 1.167L2.064 2.908ZM1.57 4.37l12 5.482v12.091l-12-5.482Zm0 0"
                                            transform="translate(388.93 371)"></path>
                                    </g>
                                    <path
                                        id="Rectangle_1160"
                                        fill="#7399bf"
                                        d="M0 0h8a1 1 0 0 1 1 1 1 1 0 0 1-1 1H0V0Z"
                                        data-name="Rectangle 1160"
                                        transform="translate(606 383)"></path>
                                    <path
                                        id="Rectangle_1162"
                                        fill="#141d26"
                                        d="M0 0h9v2H0z"
                                        data-name="Rectangle 1162"
                                        transform="translate(606 381)"></path>
                                    <path
                                        id="Rectangle_1161"
                                        fill="#7399bf"
                                        d="M0 0h6v2H0z"
                                        data-name="Rectangle 1161"
                                        transform="translate(626 383)"></path>
                                    <path
                                        id="Polygon_1"
                                        fill="#7399bf"
                                        d="m7.2 0-.163 2.977L9.95 1.91 7.987 4.227 11 5l-3.013.773L9.95 8.09 7.037 7.023 7.2 10 5.5 7.5 3.8 10l.162-2.977L1.05 8.09l1.963-2.317L0 5l3.013-.773L1.05 1.91l2.913 1.067L3.8 0l1.7 2.5Z"
                                        data-name="Polygon 1"
                                        transform="translate(628 379)"></path>
                                </g>
                            </svg>
                        </div>
                    </dd>
                    <!---->
                </dl>
            </div>
            <div class="stats__section">
                <span class="stats__section-title">Primary Fire (Automatic)</span>
                <dl class="stats__mode">
                    <dt>Fire Rate</dt>
                    <dd>{{ parseFloat(weapon?.weaponStats?.fireRate).toFixed(2) }} rounds/sec</dd>
                    <dt>Run Speed Multiplier</dt>
                    <dd>{{ weapon?.weaponStats?.runSpeedMultiplier }}x</dd>
                    <dt>First Bullet Accuracy</dt>
                    <dd>{{ weapon?.weaponStats?.firstBulletAccuracy }}</dd>
                    <dt>Shotgun Pellet Count</dt>
                    <dd>{{ weapon?.weaponStats?.shotgunPelletCount }}</dd>
                </dl>
                <div v-if="weapon?.weaponStats?.altFireType" class="stats__mode--alt">
                    <span class="stats__section-title"
                        >Alt. Fire ({{ weapon?.weaponStats?.altFireType?.replace("EWeaponAltFireDisplayType::", "") }})</span
                    >
                    <dl class="stats__mode">
                        <dt>Fire Rate</dt>
                        <dd>{{ weaponAdsStats?.fireRate }} rounds/sec</dd>
                        <dt>Run Speed Multiplier</dt>
                        <dd>{{ weaponAdsStats?.runSpeedMultiplier }}x</dd>
                        <dt>Bullet Accuracy</dt>
                        <dd>{{ weaponAdsStats?.firstBulletAccuracy }}</dd>
                        <dt>Zoom Multiplier</dt>
                        <dd>{{ weaponAdsStats?.zoomMultiplier }}x</dd>
                        <!----><!----><!---->
                    </dl>
                </div>
            </div>
            <div class="stats__section">
                <span class="stats__section-title">Damage</span>
                <div class="stats__damages">
                    <div class="stats__damage">
                        <span class="stats__damage-range">
                            {{ this.weaponDamageRange?.rangeStartMeters }}m-{{ this.weaponDamageRange?.rangeEndMeters }}m</span
                        ><svg viewBox="0 0 33.316 80" class="stats__damage-puppet">
                            <g transform="translate(-636.875 -624)">
                                <circle cx="6.153" cy="6.153" r="6.153" fill="#ff4655" transform="translate(647.387 624)"></circle>
                                <path
                                    fill="#ff99a2"
                                    d="m666.16 664.832-5.115-12.794-1.352 6.831h-12.306l-1.363-6.84-5.117 12.8a2.05 2.05 0 1 1-3.96-1.058l6.369-23.772h.008a2.055 2.055 0 0 1 2.012-1.639h4.1l4.109 4.1 4.1-4.1h4.111a2.048 2.048 0 0 1 2.016 1.712l6.352 23.7a2.05 2.05 0 1 1-3.959 1.061Z"
                                    opacity=".996"></path>
                                <path
                                    fill="#ffe6e8"
                                    d="M647.753 704h-6.52l5.862-41.025h12.893l5.857 41.021h-6.508l-5.798-32.821-5.786 32.824Z"></path>
                            </g>
                        </svg>
                        <dl class="stats__damage-damage">
                            <dt>Head</dt>
                            <dd>{{ this.weaponDamageRange?.headDamage }}</dd>
                            <dt>Body</dt>
                            <dd>{{ this.weaponDamageRange?.bodyDamage }}</dd>
                            <dt>Leg</dt>
                            <dd>{{ this.weaponDamageRange?.legDamage }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="insights">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="insights__icon">
                <path
                    d="m2.2 4 .1.1c.2.3 11.8 14.8 12.8 16v.1a.1.1 0 0 1-.1.1H8.8a.52.52 0 0 1-.4-.2c-.2-.2-4.4-5.4-6.3-7.9A.31.31 0 0 0 2 12V4.1a.349.349 0 0 1 .2-.1Zm19.8.2c0-.1-.1-.1-.1-.2h-.1l-.2.2c-.9 1.1-8.1 10.1-8.3 10.3l-.1.1c0 .1 0 .1.1.1h6.2c.1 0 .2-.1.3-.2l.2-.2c.5-.7 1.7-2.2 1.8-2.3 0-.1 0-.1.1-.2v-.1c.1-2.4.1-4.9.1-7.5Z"></path>
                    </svg><span class="insights__text">Weapon insights on the way, check back soon!</span>
        </div>
    </div>
</template>

<style scoped>
.wall-penetration__label:nth-child(2) {
    margin-left: calc(33% - 1.5rem);
}

.wall-penetration__label:nth-child(3) {
    margin-left: calc(66% - 1.5rem);
}

.wall-penetration__label {
    font-size: 0.75rem;
    opacity: 0.5;
    top: 0px;
    text-align: center;
    position: absolute;
    width: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wall-penetration__label--active {
    opacity: 1;
}

.wall-penetration__label:nth-child(4) {
    margin-left: calc(100% - 1.5rem);
}

.wall-penetration__progress {
    background: rgba(255, 255, 255, 0.15);
    height: 0.5rem;
    position: relative;
}

.wall-penetration__label:before {
    content: "";
    border-left: 1px solid #fff;
    height: 0.75rem;
    margin-bottom: 0.125rem;
}

.wall-penetration__fill {
    height: 100%;
    background: linear-gradient(to left, #bde516, #ff4655);
    width: 66%;
}

.wall-penetration {
    display: grid;
    grid-template-columns: 1rem auto 1rem;
    grid-gap: 0.5rem;
    gap: 0.5rem;
    align-items: center;
}

.stats__damage {
    display: grid;
    grid-template-columns: 2.25rem 1fr;
    grid-gap: 0.5rem 0.875rem;
    grid-template-areas:
        "range range"
        "puppet damage";
    font-size: 1rem;
    margin-top: 0.5rem;
}

.stats__mode {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.stats__section-title {
    display: block;
    color: #7399bf;
}

.stats__section:after {
    content: "";
    width: 0.25rem;
    height: 0.25rem;
    background: #fff;
    position: absolute;
    bottom: 0px;
    left: 0px;
}

.stats__damage-puppet {
    grid-area: puppet;
    width: 100%;
}

.stats__damage-damage {
    grid-area: damage;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 0.5rem;
    margin: 0;
}

.stats__damage-range {
    grid-area: range;
}

.weapon {
    padding: 0 5rem;
}
.weapon-grid {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "weapon stats insights";
}

.weapon__stage {
    background: rgba(255, 255, 255, 0.25);
    padding: 5rem 1rem;
    position: relative;
}

.weapon__details {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
}

.weapon__cost {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    fill: #fff;
    display: flex;
}

.weapon__cost-icon {
    width: 1rem;
    margin-right: 0.25rem;
}

.skins {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1rem;
    grid-gap: 1rem;
}

.skins .skin img {
    width: 100%;
    margin: 0 auto;
}

.stats__header {
    font-size: 1.5rem;
    font-family: Rajdhani, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol;
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    margin: 0;
    position: relative;
    border: 0.125rem solid #16e5b4;
    background: rgba(22, 229, 180, 0.25);
    clip-path: polygon(0 0, calc(100% - 0.625rem) 0, 100% 0.625rem, 100% 100%, 0 100%);
}

.stats__section {
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    padding: 1rem;
    font-weight: 500;
    position: relative;
}
.stats__mode dt {
    margin-left: 0;
}

.insights {
    grid-area: insights;
    background: var(--color-surface-1);
    border-radius: var(--border-radius);
    min-height: 34rem;
    align-self: flex-start;
}

.insights__icon {
    fill: #7399bf;
    width: 5rem;
    height: 5rem;
    margin: 5rem auto 1rem;
    display: block;
}

.insights__text {
    color: #7399bf;
    text-align: center;
    display: block;
    margin-bottom: 5rem;
}

.skins .skin {
    padding: 0.125rem;
    border: 0.125rem solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.15);
    cursor: pointer;
}

.skins .skin--active {
    border: 0.125rem solid #16e5b4;
    background: rgba(22, 229, 180, 0.25);
}

.weapon__chromas {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: grid;
    grid-gap: 0.5rem;
    grid-auto-flow: column;
}

.weapon__theme {
    position: absolute;
    top: .3rem;
    left: 1rem;
    opacity: 0.5;
    display: flex;
    align-items: center;
    height: 4rem;
}

.weapon__theme img {
    height: 4rem;
}

.weapon__chroma {
    width: 2.5rem;
    cursor: pointer;
    border: 0.125rem solid rgba(255, 255, 255, 0.25);
}
.weapon__chroma img {
    display: block;
    width: 100%;
}

.weapon__name {
    margin: 0;
    font-size: 1.3rem;
    font-family: Rajdhani,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen-Sans,Ubuntu,Cantarell,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;
    font-weight: 500;
}

.weapon__chroma--active {
    border: 0.125rem solid #16E5B4;
}

.pistol {
    width: 80%;
    padding-left: 40px;
}

</style>
