export type Priority = "alta" | "media" | "baja";
export type ActivityKind = "heroica" | "raid" | "farmeo";
export type MountStatus = "conseguida" | "pendiente" | "buscando" | "no-disponible";
export type GearSlot = "Cabeza" | "Cuello" | "Hombros" | "Capa" | "Pecho" | "Muñecas" | "Manos" | "Cintura" | "Piernas" | "Pies" | "Anillo 1" | "Anillo 2" | "Abalorio 1" | "Abalorio 2" | "Arma" | "Libram";

export interface Loot {
  id: string;
  name: string;
  source: string;
  note: string;
  obtained: boolean;
}
export interface Activity {
  id: string;
  name: string;
  zone: string;
  kind: ActivityKind;
  difficulty: string;
  priority: Priority;
  status: "pendiente" | "en-progreso" | "completada";
  runs: number;
  lastRun: string | null;
  note: string;
  loot: Loot[];
}
export interface Mount {
  id: string;
  name: string;
  source: string;
  category: "Mazmorra" | "Raid" | "Reputación" | "Oro" | "PvP" | "Clásico" | "Evento" | "Colección";
  status: MountStatus;
  attempts: number;
  goldCost: number;
  amount: number;
  note: string;
}
export interface Gear {
  id: string;
  slot: GearSlot;
  equipped: string;
  upgrade: string;
  source: string;
  priority: Priority;
  note: string;
  obtained: boolean;
}
export interface Objective {
  id: string;
  title: string;
  description: string;
  group: "Equipo" | "Progreso" | "Monturas" | "Economía";
  priority: Priority;
  done: boolean;
}
export interface Profile {
  name: string;
  className: string;
  race: string;
  level: number;
  hit: number;
  expertise: number;
  attackPower: number;
  strength: number;
  agility: number;
  crit: number;
  talents: string;
}
export interface TrackerState {
  version: number;
  profile: Profile;
  gold: number;
  badges: number;
  goldGoal: number;
  activities: Activity[];
  mounts: Mount[];
  gear: Gear[];
  objectives: Objective[];
}

export function makeLoot(name: string, source: string, note = ""): Loot {
  return { id: slug(`${name}-${source}`), name, source, note, obtained: false };
}
export function slug(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
export function seedState(): TrackerState {
  const dungeon = (id: string, name: string, zone: string, difficulty: string, priority: Priority, note: string, loot: Loot[] = []): Activity => ({id,name,zone,kind:"heroica",difficulty,priority,status:"pendiente",runs:0,lastRun:null,note,loot});
  const raid = (id: string, name: string, zone: string, priority: Priority, note: string, loot: Loot[] = []): Activity => ({id,name,zone,kind:"raid",difficulty:"10/25 jugadores",priority,status:"pendiente",runs:0,lastRun:null,note,loot});
  const mount = (id: string, name: string, source: string, category: Mount["category"], status: MountStatus = "pendiente", goldCost = 0, amount = 1, note = ""): Mount => ({ id,name,source,category,status,attempts:0,goldCost,amount,note });
  const gear = (slot: GearSlot, equipped: string, upgrade = "", source = "", priority: Priority = "media", note = ""): Gear => ({id:slug(slot),slot,equipped,upgrade,source,priority,note,obtained:false});
  const obj = (title: string, description: string, group: Objective["group"], priority: Priority = "media"): Objective => ({id:slug(title),title,description,group,priority,done:false});
  return {
    version: 1,
    profile: {name:"Mi paladín",className:"Retribution Paladin",race:"Draenei · Alianza",level:70,hit:121,expertise:0,attackPower:1540,strength:537,agility:177,crit:21.71,talents:"5 / 5 / 51"},
    gold:0, badges:0, goldGoal:2600,
    activities: [
      dungeon("mgt","Magisters' Terrace","Isle of Quel'Danas","Heroica","alta","Prioridad: Shard of Contempt. Al terminar, seguir por la montura.",[
        makeLoot("Shard of Contempt","Priestess Delrissa","+44 Expertise Rating; reemplazo de abalorio según hit."),makeLoot("Swift White Hawkstrider","Kael'thas Sunstrider","Montura rara")]),
      dungeon("mechanar","The Mechanar","Netherstorm","Normal / Heroica","alta","Abacus puede conseguirse en modo normal o heroico.",[
        makeLoot("Abacus of Violent Odds","Pathaleon the Calculator","Abalorio DPS")]),
      dungeon("bm","The Black Morass","Caverns of Time","Heroica","media","Comprobar Quantum Blade contra el arma equipada antes de farmear.",[
        makeLoot("Quantum Blade","Aeonus · heroica","Comparación con tu hacha actual"),makeLoot("Girdle of the Deathdealer","Aeonus · heroica","Alternativa para ajustar hit, no upgrade automático")]),
      dungeon("sethekk","Sethekk Halls","Terokkar Forest","Heroica","alta","Para Anzu puede requerirse un druida que complete su cadena en 3.3.5a.",[
        makeLoot("Reins of the Raven Lord","Anzu","Montura rara"),makeLoot("Deathforge Girdle","Talon King Ikiss","Comparar con Belt of the Guardian")]),
      dungeon("arcatraz","The Arcatraz","Netherstorm","Normal / Heroica","media","Doomplate como alternativa, no reemplazar el chest sin comparar.",[
        makeLoot("Doomplate Chestguard","Harbinger Skyriss","Comparar contra Ragesteel Breastplate")]),
      dungeon("underbog","The Underbog","Zangarmarsh","Heroica","media","Alternativa de hombros.",[
        makeLoot("Doomplate Shoulderguards","The Black Stalker","Comprobar stats reales antes de reemplazar")]),
      dungeon("slabs","Shadow Labyrinth","Terokkar Forest","Normal / Heroica","media","Opcional: arma con hit o reputación.",[
        makeLoot("Sonic Spear","Murmur","Arma alternativa si necesitás hit")]),
      dungeon("auchcrypts","Auchenai Crypts","Terokkar Forest","Heroica","baja","Completar mazmorra y badges."),
      dungeon("ramparts","Hellfire Ramparts","Hellfire Peninsula","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("bloodfurnace","The Blood Furnace","Hellfire Peninsula","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("shatteredhalls","The Shattered Halls","Hellfire Peninsula","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("slavepens","The Slave Pens","Zangarmarsh","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("steamvault","The Steamvault","Zangarmarsh","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("manatombs","Mana-Tombs","Terokkar Forest","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("botanica","The Botanica","Netherstorm","Heroica","baja","Completar contenido, reputación y badges."),
      dungeon("oldhillsbrad","Old Hillsbrad Foothills","Caverns of Time","Heroica","baja","Completar historia, reputación y badges."),
      raid("kara","Karazhan","Deadwind Pass","alta","Primera raid de referencia; arma y montura.",[
        makeLoot("Gorehowl","Prince Malchezaar","Arma de dos manos"),makeLoot("Fiery Warhorse's Reins","Attumen the Huntsman","Montura")]),
      raid("gruul","Gruul's Lair","Blade's Edge Mountains","alta","Trinket físico y tier 4.",[
        makeLoot("Dragonspine Trophy","Gruul the Dragonkiller","Abalorio deseado")]),
      raid("magtheridon","Magtheridon's Lair","Hellfire Peninsula","media","Progresión de tier 4."),
      raid("za","Zul'Aman","Ghostlands","alta","Arma y trinket. Amani War Bear no está disponible en Blizzlike 3.3.5a.",[
        makeLoot("Jin'rohk, The Great Apocalypse","Zul'jin","Arma de dos manos"),makeLoot("Berserker's Call","Zul'jin","Trinket DPS")]),
      raid("ssc","Serpentshrine Cavern","Zangarmarsh","media","Tier 5 y equipo intermedio.",[
        makeLoot("Belt of One-Hundred Deaths","Lady Vashj","Cinturón DPS")]),
      raid("tk","Tempest Keep: The Eye","Netherstorm","alta","Colección de montura y tier 5.",[
        makeLoot("Ashes of Al'ar","Kael'thas Sunstrider","Montura voladora muy rara")]),
      raid("hyjal","Battle for Mount Hyjal","Caverns of Time","media","Tier 6, completar la progresión."),
      raid("bt","Black Temple","Shadowmoon Valley","alta","Equipo avanzado tier 6.",[
        makeLoot("Torch of the Damned","Reliquary of Souls","Arma de dos manos")]),
      raid("sunwell","Sunwell Plateau","Isle of Quel'Danas","alta","Objetivo final de progreso de nivel 70.",[
        makeLoot("Apolyon, the Soul-Render","Kil'jaeden","Arma final"),makeLoot("Blackened Naaru Sliver","M'uru / Entropius","Abalorio final")]),
      raid("zg","Zul'Gurub","Stranglethorn Vale","media","Monturas clásicas; no es una raid de progresión de equipo.",[
        makeLoot("Swift Zulian Tiger","High Priest Thekal","Montura"),makeLoot("Swift Razzashi Raptor","Bloodlord Mandokir","Montura")]),
      dungeon("stratholme","Stratholme","Eastern Plaguelands","Normal","media","Montura clásica.",[
        makeLoot("Deathcharger's Reins","Baron Rivendare","Montura")]),
    ],
    mounts: [
      mount("racial","Monturas raciales de la Alianza","Ciudades de la Alianza","Colección","conseguida",0,1,"Grupo marcado completo según lo que ya tenés."),
      mount("kurenai","Talbuks de Kurenai","Kurenai · Nagrand","Colección","conseguida",0,8,"8 monturas obtenidas."),
      mount("skyguard","Nether Rays de Sha'tari Skyguard","Sha'tari Skyguard · Terokkar","Colección","conseguida",0,5,"5 monturas obtenidas."),
      mount("netherwing-owned","Netherwing Drake que ya tenés","Netherwing · Shadowmoon Valley","Colección","conseguida",0,1,"Editar nombre si querés precisar el color."),
      mount("cenarion","Cenarion War Hippogryph","Cenarion Expedition · Exaltado","Oro","pendiente",1600,1,"Reputación completada; falta reunir oro."),
      ...Array.from({length:5},(_,i)=>mount(`netherwing-${i+1}`,`Netherwing Drake pendiente ${i+1}/5`,`Drake Dealer Hurlunk · Shadowmoon Valley`,`Oro`,`pendiente`,200,1,"Cambiar por el color que te falte.")),
      mount("raven","Reins of the Raven Lord","Anzu · Sethekk Halls Heroic","Mazmorra","buscando"),
      mount("hawk","Swift White Hawkstrider","Kael'thas · Magisters' Terrace Heroic","Mazmorra","buscando"),
      mount("warhorse","Fiery Warhorse's Reins","Attumen · Karazhan","Raid","buscando"),
      mount("ashes","Ashes of Al'ar","Kael'thas · The Eye","Raid","buscando"),
      mount("tiger","Swift Zulian Tiger","High Priest Thekal · Zul'Gurub","Clásico","pendiente"),
      mount("raptor","Swift Razzashi Raptor","Bloodlord Mandokir · Zul'Gurub","Clásico","pendiente"),
      mount("deathcharger","Deathcharger's Reins","Baron Rivendare · Stratholme","Clásico","pendiente"),
      mount("frostsaber","Winterspring Frostsaber","Wintersaber Trainers · Winterspring","Reputación","pendiente"),
      mount("darktalbuk","Dark Riding Talbuk","Halaa · Nagrand","PvP","pendiente"),
      mount("darkwartalbuk","Dark War Talbuk","Halaa · Nagrand","PvP","pendiente"),
      mount("pvp","Monturas PvP de la Alianza","Honor / Marcas / Alterac Valley","PvP","pendiente",0,1,"Colección agrupada: separar por montura más adelante."),
      mount("seasonal","Monturas de eventos de temporada","Eventos del calendario","Evento","pendiente",0,1,"Disponibilidad según fecha y reglas del servidor."),
      mount("amani","Amani War Bear (retirada)","Zul'Aman · parche anterior a 3.0.2","Raid","no-disponible",0,1,"No es obtenible en Blizzlike 3.3.5a; dejar solo como referencia."),
    ],
    gear: [
      gear("Cabeza","Hope Bearer Helm","Por definir","Raids TBC","media","Revisar hit antes de cambiar."),
      gear("Cuello","Necklace of Trophies","Por definir","Karazhan / raids","media"),
      gear("Hombros","Ragesteel Shoulders","Por definir","Heroicas / raids","alta","El bonus de set Ragesteel NO funciona sin herrería; confirmado por tu prueba."),
      gear("Capa","Cloak of Malice","Por definir","Raids TBC","media"),
      gear("Pecho","Ragesteel Breastplate","Tier / upgrade de raid","Raids TBC","baja","Comprado en subasta; no se recibe bonus de set."),
      gear("Muñecas","Bracers of Recklessness","Por definir","Raids TBC","media"),
      gear("Manos","Hard Khorium Battlefists","Mantener","Sunwell / comparación","baja","Muy buen par de guantes; no reemplazar por loot azul."),
      gear("Cintura","Belt of the Guardian","Por definir","Heroicas / raids","media","+24 Strength, 2 sockets; defensa y block no aportan DPS. Falta gema amarilla."),
      gear("Piernas","Legguards of the Shattered Hand","Por definir","Raids TBC","media","Ofrecen hit: revisar cap al cambiar."),
      gear("Pies","Bloodsworn Warboots","Por definir","Raids TBC","media"),
      gear("Anillo 1","Spellsword's Mark of the Redemption","Shapeshifter's Signet","Lower City · Nakodu","alta","Anillo con expertise si tenés exaltado."),
      gear("Anillo 2","Ring of Umbral Doom","Por definir","Raids TBC","media"),
      gear("Abalorio 1","Mercurial Stone","Trinket DPS cuando sobre hit","Raids / Badges","media","Conservar de momento por sus 27 Hit Rating."),
      gear("Abalorio 2","Uniting Charm","Shard of Contempt","Priestess Delrissa · Magisters' Terrace Heroic","alta","Shard de expertise como primera gran mejora."),
      gear("Arma","Axe of Shattered Dreams","Gorehowl / Jin'rohk","Karazhan / Zul'Aman","alta","Objetivo principal de daño: arma de dos manos."),
      gear("Libram","Libram of Avengement","Mantener","Equipo actual","baja"),
    ],
    objectives: [
      obj("Cambiar glifo de Hammer of Justice","Comprar Glyph of Seal of Vengeance: +10 expertise con el sello activo.","Equipo","alta"),
      obj("Completar la gema del cinturón","Rellenar el socket amarillo vacío de Belt of the Guardian.","Equipo","alta"),
      obj("Conseguir Shapeshifter's Signet","Comprar a Nakodu si ya tenés exaltado con Lower City.","Equipo","alta"),
      obj("Conseguir Shard of Contempt","Priestess Delrissa · Magisters' Terrace Heroic.","Equipo","alta"),
      obj("Conseguir Abacus of Violent Odds","Pathaleon · The Mechanar.","Equipo","media"),
      obj("Primera limpieza de Karazhan","Buscar arma, tier y montura.","Progreso","alta"),
      obj("Mejorar el arma de dos manos","Gorehowl / Jin'rohk / alternativa por badges.","Equipo","alta"),
      obj("Comprar Cenarion War Hippogryph","Reputación ya lista; juntar 1.600 de oro.","Monturas","media"),
      obj("Completar los otros Netherdrakes","Cinco variantes pendientes: estimado 1.000 de oro.","Monturas","baja"),
      obj("Completar Black Temple","Avanzar tier 6 y buscar Torch of the Damned.","Progreso","media"),
      obj("Completar Sunwell Plateau","Objetivo final de nivel 70.","Progreso","media"),
    ],
  };
}

export function isTrackerState(value: unknown): value is TrackerState {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return s.version === 1 && typeof s.profile === "object" && s.profile !== null &&
    typeof s.gold === "number" && typeof s.badges === "number" &&
    Array.isArray(s.activities) && Array.isArray(s.mounts) && Array.isArray(s.gear) && Array.isArray(s.objectives);
}
