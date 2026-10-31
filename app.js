/**
 * PayEquator Global - Interactive Application Engine
 * Zero-latency browser calculations, visual meters, charts, and social card export
 * Expanded to 25 Major Tech / Remote-Hiring Hubs with Instant Responsive Search Filter
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const currencySelect = document.getElementById('currency-select');
  const salaryInput = document.getElementById('salary-input');
  const homeLocationSelect = document.getElementById('home-location-select');
  const targetLocationSelect = document.getElementById('target-location-select');
  const roleSelect = document.getElementById('role-select');
  const calculatorForm = document.getElementById('calculator-form');
  const salaryPresets = document.getElementById('salary-presets');

  // Searchable Combobox DOM Elements
  const homeComboboxTrigger = document.getElementById('home-combobox-trigger');
  const homeComboboxDisplay = document.getElementById('home-combobox-display');
  const homeComboboxMenu = document.getElementById('home-combobox-menu');
  const homeSearchInput = document.getElementById('home-search-input');
  const homeComboboxList = document.getElementById('home-combobox-list');

  const targetComboboxTrigger = document.getElementById('target-combobox-trigger');
  const targetComboboxDisplay = document.getElementById('target-combobox-display');
  const targetComboboxMenu = document.getElementById('target-combobox-menu');
  const targetSearchInput = document.getElementById('target-search-input');
  const targetComboboxList = document.getElementById('target-combobox-list');

  // Period toggles
  const toggleAnnual = document.getElementById('toggle-annual');
  const toggleMonthly = document.getElementById('toggle-monthly');
  let currentPeriod = 'annual'; // 'annual' | 'monthly'

  // Tax mode toggle
  const taxModeEmp = document.getElementById('tax-mode-emp');
  const taxModeContractor = document.getElementById('tax-mode-contractor');
  let isContractor = false;

  // Output Elements - Card 1 (PPP Adjusted)
  const pppAdjustedAmount = document.getElementById('ppp-adjusted-amount');
  const targetCurrencyPill = document.getElementById('target-currency-pill');
  const nominalFxAmount = document.getElementById('nominal-fx-amount');
  const pppPremiumNote = document.getElementById('ppp-premium-note');

  // Output Elements - Card 2 (Fair Value Index)
  const gaugeProgress = document.getElementById('gauge-progress');
  const fairValuePercent = document.getElementById('fair-value-percent');
  const fairValueBadge = document.getElementById('fair-value-badge');
  const fairValueSubtext = document.getElementById('fair-value-subtext');

  // Output Elements - Card 3 (Cost Multiplier)
  const colMultiplierValue = document.getElementById('col-multiplier-value');
  const colPercentageDiff = document.getElementById('col-percentage-diff');
  const barHomeIndex = document.getElementById('bar-home-index');
  const barTargetIndex = document.getElementById('bar-target-index');
  const pppInsightSummary = document.getElementById('ppp-insight-summary');

  // Context Labels
  const labelHomeCity = document.getElementById('label-home-city');
  const labelTargetCity = document.getElementById('label-target-city');
  const livingGapStatus = document.getElementById('living-gap-status');
  const homeTaxRateLabel = document.getElementById('home-tax-rate');
  const targetTaxRateLabel = document.getElementById('target-tax-rate');

  // Scorecard Elements
  const scRoleTitle = document.getElementById('sc-role-title');
  const scLocationLabel = document.getElementById('sc-location-label');
  const scTargetLabel = document.getElementById('sc-target-label');
  const scBaseSalary = document.getElementById('sc-base-salary');
  const scBaseUsd = document.getElementById('sc-base-usd');
  const scPppSalary = document.getElementById('sc-ppp-salary');
  const scLifestyleMult = document.getElementById('sc-lifestyle-mult');
  const scPercentileBadge = document.getElementById('sc-percentile-badge');
  const scMarketStanding = document.getElementById('sc-market-standing');
  const scStandingBar = document.getElementById('sc-standing-bar');
  const scDateStamp = document.getElementById('sc-date-stamp');

  // Scorecard Action Buttons
  const downloadCardBtn = document.getElementById('download-card-btn');
  const shareLinkedinBtn = document.getElementById('share-linkedin-btn');
  const shareTwitterBtn = document.getElementById('share-twitter-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const quickShareBtn = document.getElementById('quick-share-btn');
  const jumpToScorecard = document.getElementById('jump-to-scorecard');

  // City Cost Swap category elements
  const catRentDiff = document.getElementById('cat-rent-diff');
  const barHomeRent = document.getElementById('bar-home-rent');
  const valHomeRent = document.getElementById('val-home-rent');
  const barTargetRent = document.getElementById('bar-target-rent');
  const valTargetRent = document.getElementById('val-target-rent');

  const catGroceriesDiff = document.getElementById('cat-groceries-diff');
  const barHomeGroceries = document.getElementById('bar-home-groceries');
  const valHomeGroceries = document.getElementById('val-home-groceries');
  const barTargetGroceries = document.getElementById('bar-target-groceries');
  const valTargetGroceries = document.getElementById('val-target-groceries');

  const catRestaurantDiff = document.getElementById('cat-restaurant-diff');
  const barHomeRestaurant = document.getElementById('bar-home-restaurant');
  const valHomeRestaurant = document.getElementById('val-home-restaurant');
  const barTargetRestaurant = document.getElementById('bar-target-restaurant');
  const valTargetRestaurant = document.getElementById('val-target-restaurant');

  // Tax Section Elements
  const taxHomeGross = document.getElementById('tax-home-gross');
  const taxHomeTaxAmount = document.getElementById('tax-home-tax-amount');
  const taxHomeRatePercent = document.getElementById('tax-home-rate-percent');
  const taxHomeNet = document.getElementById('tax-home-net');
  const taxHomeNetMonthly = document.getElementById('tax-home-net-monthly');
  const taxHomeNetUsd = document.getElementById('tax-home-net-usd');
  const taxTargetNetNeeded = document.getElementById('tax-target-net-needed');
  const taxTargetTaxAmount = document.getElementById('tax-target-tax-amount');
  const taxTargetGrossReq = document.getElementById('tax-target-gross-req');

  // Methodology Modal Elements
  const methodologyModal = document.getElementById('methodology-modal');
  const openMethodologyBtn = document.getElementById('open-methodology-btn');
  const footerMethodologyBtn = document.getElementById('footer-methodology-btn');
  const closeMethodologyBtn = document.getElementById('close-methodology-btn');
  const modalGotItBtn = document.getElementById('modal-got-it-btn');

  // Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Global Chart instance
  let costChart = null;

  // Selected State
  let currentHomeId = 'in_blr_del'; // Default India
  let currentTargetId = 'us_nyc_sf'; // Default United States

  const homeWrapper = document.getElementById('home-combobox-wrapper');
  const targetWrapper = document.getElementById('target-combobox-wrapper');

  // Flag HTML Helper with real CDN image for Windows compatibility
  function renderFlagHtml(loc) {
    if (loc && loc.code) {
      return `<img src="https://flagcdn.com/20x15/${loc.code}.png" alt="${loc.country}" class="w-5 h-3.5 object-cover rounded shadow-sm inline-block shrink-0">`;
    }
    return `<span>${loc ? loc.flag : '🌐'}</span>`;
  }

  // --- 1. Populate Currencies & Dropdowns ---
  function initCurrencies() {
    currencySelect.innerHTML = '';
    Object.keys(PPP_DATA.currencies).forEach(code => {
      const curr = PPP_DATA.currencies[code];
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = `${code} (${curr.symbol})`;
      if (code === 'INR') opt.selected = true;
      currencySelect.appendChild(opt);
    });
  }

  // Render Combobox List items with search filter
  function renderComboboxList(type, filterText = '') {
    const listContainer = type === 'home' ? homeComboboxList : targetComboboxList;
    const selectedId = type === 'home' ? currentHomeId : currentTargetId;
    listContainer.innerHTML = '';

    const cleanFilter = filterText.toLowerCase().trim();
    const filteredLocations = PPP_DATA.locations.filter(loc => {
      if (!cleanFilter) return true;
      return loc.country.toLowerCase().includes(cleanFilter) ||
             loc.city.toLowerCase().includes(cleanFilter) ||
             loc.currency.toLowerCase().includes(cleanFilter);
    });

    if (filteredLocations.length === 0) {
      listContainer.innerHTML = `
        <div class="px-3 py-4 text-center text-xs text-slate-500 font-medium">
          No matching countries found
        </div>
      `;
      return;
    }

    filteredLocations.forEach(loc => {
      const isSelected = loc.id === selectedId;
      const item = document.createElement('div');
      item.className = `p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between text-xs ${
        isSelected ? 'bg-[#38BDF8]/20 border border-[#38BDF8]/40 text-white' : 'hover:bg-[#1D2A42] text-slate-200'
      }`;
      
      const cityShort = loc.city.split('/')[0].trim();
      const taxRate = isContractor ? loc.contractorTaxRate : loc.employeeTaxRate;

      item.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 pr-2">
          ${renderFlagHtml(loc)}
          <div class="min-w-0 truncate">
            <div class="font-bold text-white text-xs truncate">${loc.country}</div>
            <div class="text-[10px] text-slate-400 truncate">${cityShort} &bull; ${loc.currency}</div>
          </div>
        </div>
        <div class="text-right shrink-0 flex items-center gap-1.5 font-mono">
          <span class="px-1.5 py-0.5 rounded text-[10px] bg-[#0B0F19] text-[#38BDF8] border border-[#26334D]" title="World Bank PPP Factor">
            PPP ${loc.pppFactor}
          </span>
          <span class="px-1.5 py-0.5 rounded text-[10px] bg-[#0B0F19] text-[#A3E635] border border-[#26334D]" title="Contractor Tax Slab">
            ${taxRate.toFixed(0)}% Tax
          </span>
        </div>
      `;

      item.addEventListener('click', () => {
        selectLocation(type, loc.id);
      });

      listContainer.appendChild(item);
    });
  }

  function updateComboboxDisplay(type) {
    const locId = type === 'home' ? currentHomeId : currentTargetId;
    const loc = PPP_DATA.locations.find(l => l.id === locId) || PPP_DATA.locations[0];
    const displayElem = type === 'home' ? homeComboboxDisplay : targetComboboxDisplay;
    const cityShort = loc.city.split('/')[0].trim();
    
    displayElem.innerHTML = `
      <div class="flex items-center gap-2 truncate">
        ${renderFlagHtml(loc)} 
        <span class="font-bold text-white truncate">${loc.country}</span> 
        <span class="text-slate-400 text-xs hidden sm:inline">(${cityShort})</span>
      </div>
    `;

    // Keep hidden select synchronized
    if (type === 'home') {
      homeLocationSelect.value = loc.id;
    } else {
      targetLocationSelect.value = loc.id;
    }
  }

  function selectLocation(type, locId) {
    const loc = PPP_DATA.locations.find(l => l.id === locId);
    if (!loc) return;

    if (type === 'home') {
      currentHomeId = locId;
      updateComboboxDisplay('home');
      closeCombobox('home');
      
      // Auto-update currency to home local currency
      if (PPP_DATA.currencies[loc.currency]) {
        currencySelect.value = loc.currency;
      }
      // Update salary to typical role benchmark for this country
      const role = roleSelect.value;
      const typicalSalary = loc.roleBenchmarks[role] || 100000;
      salaryInput.value = formatNumber(typicalSalary);
    } else {
      currentTargetId = locId;
      updateComboboxDisplay('target');
      closeCombobox('target');
    }

    // Recalculate without page reload
    calculate();
  }

  function toggleCombobox(type) {
    const menu = type === 'home' ? homeComboboxMenu : targetComboboxMenu;
    const searchInput = type === 'home' ? homeSearchInput : targetSearchInput;
    const otherType = type === 'home' ? 'target' : 'home';
    
    closeCombobox(otherType);

    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      if (type === 'home' && homeWrapper) homeWrapper.style.zIndex = '60';
      if (type === 'target' && targetWrapper) targetWrapper.style.zIndex = '60';

      menu.classList.remove('hidden');
      renderComboboxList(type, '');
      searchInput.value = '';
      if (window.innerWidth > 640) setTimeout(() => searchInput.focus(), 50);
    } else {
      menu.classList.add('hidden');
      if (homeWrapper) homeWrapper.style.zIndex = '40';
      if (targetWrapper) targetWrapper.style.zIndex = '40';
    }
  }

  function closeCombobox(type) {
    const menu = type === 'home' ? homeComboboxMenu : targetComboboxMenu;
    if (menu) menu.classList.add('hidden');
    if (type === 'home' && homeWrapper) homeWrapper.style.zIndex = '40';
    if (type === 'target' && targetWrapper) targetWrapper.style.zIndex = '40';
  }

  // Setup Combobox event listeners
  homeComboboxTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCombobox('home');
  });

  targetComboboxTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCombobox('target');
  });

  // Responsive Search Inputs
  homeSearchInput.addEventListener('input', (e) => {
    renderComboboxList('home', e.target.value);
  });

  targetSearchInput.addEventListener('input', (e) => {
    renderComboboxList('target', e.target.value);
  });

  // Prevent popover close on input click
  homeComboboxMenu.addEventListener('click', (e) => e.stopPropagation());
  targetComboboxMenu.addEventListener('click', (e) => e.stopPropagation());

  // Close menus on outside click or Escape key
  document.addEventListener('click', () => {
    closeCombobox('home');
    closeCombobox('target');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCombobox('home');
      closeCombobox('target');
    }
  });

  // Populate hidden selects
  function initHiddenSelects() {
    homeLocationSelect.innerHTML = '';
    targetLocationSelect.innerHTML = '';
    PPP_DATA.locations.forEach(loc => {
      const opt1 = document.createElement('option');
      opt1.value = loc.id;
      opt1.textContent = `${loc.country} (${loc.city})`;
      if (loc.id === currentHomeId) opt1.selected = true;
      homeLocationSelect.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = loc.id;
      opt2.textContent = `${loc.country} (${loc.city})`;
      if (loc.id === currentTargetId) opt2.selected = true;
      targetLocationSelect.appendChild(opt2);
    });

    updateComboboxDisplay('home');
    updateComboboxDisplay('target');

    // Date stamp
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (scDateStamp) scDateStamp.textContent = `${dateFormatted} Verified Audit`;
  }

  // --- 2. Helper Formatting Functions ---
  function formatNumber(num) {
    if (isNaN(num)) return '0';
    return Math.round(num).toLocaleString('en-US');
  }

  function parseFormattedNumber(str) {
    if (typeof str === 'number') return str;
    const clean = String(str).replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  }

  function getCurrencySymbol(currCode) {
    return PPP_DATA.currencies[currCode]?.symbol || currCode;
  }

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }

  // --- 3. Core Calculation Engine ---
  function calculate() {
    const rawSalary = parseFormattedNumber(salaryInput.value);
    const selectedCurrency = currencySelect.value;
    const selectedRole = roleSelect.value;

    const homeLoc = PPP_DATA.locations.find(l => l.id === currentHomeId) || PPP_DATA.locations[2];
    const targetLoc = PPP_DATA.locations.find(l => l.id === currentTargetId) || PPP_DATA.locations[0];

    // Cost Multiplier
    // Target Index / Base Index
    const multiplier = targetLoc.index / homeLoc.index;
    const multiplierFormatted = multiplier.toFixed(2);
    const percentageDiff = Math.round((multiplier - 1) * 100);

    // Currencies
    const currMeta = PPP_DATA.currencies[selectedCurrency] || { rateToUSD: 1 };
    const homeCurrencyMeta = PPP_DATA.currencies[homeLoc.currency] || { rateToUSD: 1 };
    const targetCurrencyMeta = PPP_DATA.currencies[targetLoc.currency] || { rateToUSD: 1 };

    // Amount in USD nominal
    const amountInUSD = rawSalary * currMeta.rateToUSD;

    // Equivalent value using PPP logic:
    // Convert input salary into home currency units first if different
    const salaryInHomeCurrency = (amountInUSD / homeCurrencyMeta.rateToUSD);
    
    // Equivalent in target currency:
    // (Local Base Amount / Local PPP Factor) * Target PPP Factor
    const pppEquivalentTargetCurrency = (salaryInHomeCurrency / homeLoc.pppFactor) * targetLoc.pppFactor;
    
    // Period divider (annual vs monthly)
    const periodDivider = currentPeriod === 'monthly' ? 12 : 1;
    const displayBaseSalary = rawSalary / periodDivider;
    const displayPppEquivalent = pppEquivalentTargetCurrency / periodDivider;
    const displayNominalTarget = (amountInUSD / targetCurrencyMeta.rateToUSD) / periodDivider;

    // Display symbols
    const targetSymbol = getCurrencySymbol(targetLoc.currency);
    const homeSymbol = getCurrencySymbol(selectedCurrency);

    // --- Update Card 1: PPP Adjusted Salary ---
    pppAdjustedAmount.textContent = `${targetSymbol}${formatNumber(displayPppEquivalent)}`;
    targetCurrencyPill.textContent = targetLoc.currency;
    nominalFxAmount.textContent = `${targetSymbol}${formatNumber(displayNominalTarget)}`;
    
    const pppAdvantagePercent = Math.round(((displayPppEquivalent - displayNominalTarget) / (displayNominalTarget || 1)) * 100);
    if (pppAdvantagePercent > 0) {
      pppPremiumNote.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> +${pppAdvantagePercent}% local real-world leverage`;
      pppPremiumNote.className = "text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold";
    } else {
      pppPremiumNote.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${pppAdvantagePercent}% relative purchasing drag`;
      pppPremiumNote.className = "text-[10px] text-rose-400 mt-1 flex items-center gap-1 font-semibold";
    }

    // --- Update Card 2: Fair Value Index & Radial Gauge ---
    const roleTargetBenchmark = targetLoc.roleBenchmarks[selectedRole] || 150000;
    const ratioToBenchmark = pppEquivalentTargetCurrency / roleTargetBenchmark;
    const fairPercent = Math.min(Math.round(ratioToBenchmark * 100), 160);

    fairValuePercent.textContent = `${fairPercent}%`;

    // SVG gauge circle calculation (circumference = 314)
    const circumference = 314;
    const normalizedProgress = Math.min(Math.max(fairPercent / 100, 0), 1.25);
    const offset = Math.max(0, circumference - (circumference * Math.min(normalizedProgress, 1)));
    gaugeProgress.style.strokeDashoffset = offset;

    // Classification
    let standingText = '';
    let standingClass = '';
    let badgeColor = '';
    let subtext = '';

    if (fairPercent < 75) {
      standingText = 'Underpaid / Discounted Offer';
      badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      standingClass = 'Underpaid';
      subtext = 'Below fair market compensation for this seniority.';
      gaugeProgress.style.stroke = '#F43F5E';
    } else if (fairPercent <= 110) {
      standingText = 'Competitive Global Parity';
      badgeColor = 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/40';
      standingClass = 'Competitive';
      subtext = 'Healthy, balanced standard-of-living equivalence.';
      gaugeProgress.style.stroke = '#38BDF8';
    } else {
      standingText = 'Tier-1 Elite Compensation';
      badgeColor = 'bg-[#A3E635]/20 text-[#A3E635] border-[#A3E635]/40';
      standingClass = 'Tier-1 Elite';
      subtext = 'Top decile real-world wealth accumulation.';
      gaugeProgress.style.stroke = '#A3E635';

      // Confetti trigger
      if (window.confetti && Math.random() < 0.3) {
        window.confetti({
          particleCount: 35,
          spread: 55,
          origin: { y: 0.7 },
          colors: ['#A3E635', '#10B981', '#38BDF8']
        });
      }
    }

    fairValueBadge.textContent = standingClass;
    fairValueBadge.className = `inline-block px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`;
    fairValueSubtext.textContent = subtext;

    // --- Update Card 3: Cost of Living Multiplier ---
    colMultiplierValue.textContent = `${multiplierFormatted}x`;
    if (percentageDiff >= 0) {
      colPercentageDiff.textContent = `${percentageDiff}% more costly`;
      colPercentageDiff.className = "text-amber-300 font-bold";
    } else {
      colPercentageDiff.textContent = `${Math.abs(percentageDiff)}% cheaper`;
      colPercentageDiff.className = "text-emerald-400 font-bold";
    }

    barHomeIndex.textContent = homeLoc.index.toFixed(1);
    barTargetIndex.textContent = targetLoc.index.toFixed(1);

    // Callout Insight Sentence
    const homeUnit = `1.00 ${targetLoc.currency}`;
    const pppInHomeUnits = (homeLoc.pppFactor / targetLoc.pppFactor).toFixed(2);
    pppInsightSummary.innerHTML = `<strong>${homeUnit}</strong> in ${targetLoc.city.split('/')[0]} has the same purchasing power as approximately <strong>${pppInHomeUnits} ${homeLoc.currency}</strong> in ${homeLoc.city.split('/')[0]} — representing a <strong>${multiplierFormatted}x lifestyle arbitrage</strong> for remote talent.`;

    // Context labels
    labelHomeCity.textContent = `${homeLoc.city.split('/')[0]}, ${homeLoc.country}`;
    labelTargetCity.textContent = `${targetLoc.city.split('/')[0]}, ${targetLoc.country}`;
    livingGapStatus.textContent = percentageDiff >= 0 ? `+${percentageDiff}% Advantage` : `${percentageDiff}% Arbitrage`;
    
    const activeHomeTax = isContractor ? homeLoc.contractorTaxRate : homeLoc.employeeTaxRate;
    const activeTargetTax = isContractor ? targetLoc.contractorTaxRate : targetLoc.employeeTaxRate;
    homeTaxRateLabel.textContent = `${activeHomeTax.toFixed(1)}% (${isContractor ? 'Contractor' : 'Emp'})`;
    targetTaxRateLabel.textContent = `${activeTargetTax.toFixed(1)}% (${isContractor ? 'Contractor' : 'Emp'})`;

    // --- Update Scorecard Viral Card ---
    scRoleTitle.innerHTML = `<span>${selectedRole}</span> <i class="fa-solid fa-circle-check text-[#38BDF8] text-sm"></i>`;
    scLocationLabel.innerHTML = `<span class="inline-flex items-center gap-1.5">${renderFlagHtml(homeLoc)} <span>${homeLoc.city.split('/')[0]}, ${homeLoc.country}</span></span>`;
    scTargetLabel.innerHTML = `<span class="inline-flex items-center gap-1.5">${renderFlagHtml(targetLoc)} <span>${targetLoc.country}</span></span>`;
    scBaseSalary.textContent = `${homeSymbol}${formatNumber(rawSalary)} / yr`;
    scBaseUsd.textContent = `~$${formatNumber(amountInUSD)} Nominal USD`;
    scPppSalary.textContent = `${targetSymbol}${formatNumber(pppEquivalentTargetCurrency)} / yr`;
    scLifestyleMult.textContent = `${multiplierFormatted}x Lifestyle Multiplier`;

    // Scorecard Badge
    if (fairPercent >= 115) {
      scPercentileBadge.textContent = 'Top 5% Global PPP';
      scPercentileBadge.className = 'px-3 py-1 rounded-full text-xs font-bold font-mono bg-gradient-to-r from-emerald-500/30 to-[#A3E635]/30 text-[#A3E635] border border-[#A3E635]/50';
    } else if (fairPercent >= 90) {
      scPercentileBadge.textContent = 'Top 15% Local PPP';
      scPercentileBadge.className = 'px-3 py-1 rounded-full text-xs font-bold font-mono bg-gradient-to-r from-sky-500/30 to-emerald-500/30 text-sky-300 border border-sky-400/50';
    } else {
      scPercentileBadge.textContent = 'Standard Range';
      scPercentileBadge.className = 'px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-800 text-slate-300 border border-slate-700';
    }

    scMarketStanding.textContent = standingText;
    const standingBarWidth = Math.min(Math.max(fairPercent, 15), 100);
    scStandingBar.style.width = `${standingBarWidth}%`;

    // --- Update City Cost Swap Section ---
    updateCityCostSwap(homeLoc, targetLoc);

    // --- Update Tax Estimator Section ---
    updateTaxEstimator(rawSalary, homeLoc, targetLoc, currMeta, homeSymbol, targetSymbol, pppEquivalentTargetCurrency);

    // --- Update Lifestyle Expense Bucket Breakdown ---
    updateLifestyleBuckets(homeLoc, targetLoc);

    // --- Update Counter-Offer Negotiation Generator ---
    updateNegotiationScript(homeLoc, targetLoc, rawSalary, pppEquivalentTargetCurrency, amountInUSD, selectedRole, selectedCurrency, multiplierFormatted);
  }

  // --- Feature: Lifestyle Expense Bucket Allocation ---
  function updateLifestyleBuckets(homeLoc, targetLoc) {
    const bucketHomeLabel = document.getElementById('bucket-home-label');
    const bucketTargetLabel = document.getElementById('bucket-target-label');

    const barHomeRent = document.getElementById('bucket-bar-home-rent');
    const barHomeDaily = document.getElementById('bucket-bar-home-daily');
    const barHomeSavings = document.getElementById('bucket-bar-home-savings');

    const valHomeRent = document.getElementById('bucket-val-home-rent');
    const valHomeDaily = document.getElementById('bucket-val-home-daily');
    const valHomeSavings = document.getElementById('bucket-val-home-savings');
    const pillHomeSavings = document.getElementById('bucket-home-savings-pill');

    const barTargetRent = document.getElementById('bucket-bar-target-rent');
    const barTargetDaily = document.getElementById('bucket-bar-target-daily');
    const barTargetSavings = document.getElementById('bucket-bar-target-savings');

    const valTargetRent = document.getElementById('bucket-val-target-rent');
    const valTargetDaily = document.getElementById('bucket-val-target-daily');
    const valTargetSavings = document.getElementById('bucket-val-target-savings');
    const pillTargetSavings = document.getElementById('bucket-target-savings-pill');

    if (!barHomeRent) return;

    // Home location dynamic percentage breakdown based on rent and groceries index
    const homeRentPct = Math.min(Math.max(Math.round(15 + (homeLoc.rentIndex / 100) * 24), 16), 46);
    const homeDailyPct = Math.min(Math.max(Math.round(20 + (homeLoc.groceriesIndex / 100) * 14), 20), 36);
    const homeSavingsPct = Math.max(12, 100 - homeRentPct - homeDailyPct);

    // Target benchmark dynamic percentage breakdown
    const targetRentPct = Math.min(Math.max(Math.round(18 + (targetLoc.rentIndex / 100) * 30), 25), 52);
    const targetDailyPct = Math.min(Math.max(Math.round(22 + (targetLoc.groceriesIndex / 100) * 14), 22), 38);
    const targetSavingsPct = Math.max(8, 100 - targetRentPct - targetDailyPct);

    bucketHomeLabel.innerHTML = `<span class="text-base">${renderFlagHtml(homeLoc)}</span> <span>${homeLoc.city.split('/')[0]}, ${homeLoc.country}</span>`;
    bucketTargetLabel.innerHTML = `<span class="text-base">${renderFlagHtml(targetLoc)}</span> <span>${targetLoc.city.split('/')[0]}, ${targetLoc.country}</span>`;

    // Apply widths
    barHomeRent.style.width = `${homeRentPct}%`;
    barHomeDaily.style.width = `${homeDailyPct}%`;
    barHomeSavings.style.width = `${homeSavingsPct}%`;

    valHomeRent.textContent = `${homeRentPct}%`;
    valHomeDaily.textContent = `${homeDailyPct}%`;
    valHomeSavings.textContent = `${homeSavingsPct}%`;
    pillHomeSavings.textContent = `+${homeSavingsPct}% Savings Rate`;

    barTargetRent.style.width = `${targetRentPct}%`;
    barTargetDaily.style.width = `${targetDailyPct}%`;
    barTargetSavings.style.width = `${targetSavingsPct}%`;

    valTargetRent.textContent = `${targetRentPct}%`;
    valTargetDaily.textContent = `${targetDailyPct}%`;
    valTargetSavings.textContent = `${targetSavingsPct}%`;
    pillTargetSavings.textContent = `+${targetSavingsPct}% Savings Rate`;
  }

  // --- Feature: Counter-Offer Negotiation Script Generator ---
  let currentNegotiationTone = 'collaborative';
  const negotiationScriptBox = document.getElementById('negotiation-script-box');
  const negotiationToneToggle = document.getElementById('negotiation-tone-toggle');
  const copyScriptBtn = document.getElementById('copy-script-btn');
  const copyScriptBtnText = document.getElementById('copy-script-btn-text');

  function updateNegotiationScript(homeLoc, targetLoc, rawSalary, pppEquivalentTargetCurrency, amountInUSD, selectedRole, selectedCurrency, multiplierFormatted) {
    if (!negotiationScriptBox) return;

    const formattedBase = `${getCurrencySymbol(selectedCurrency)}${formatNumber(rawSalary)}`;
    const formattedPpp = `${getCurrencySymbol(targetLoc.currency)}${formatNumber(pppEquivalentTargetCurrency)}`;
    const formattedUsd = `$${formatNumber(amountInUSD)}`;
    const cityHome = homeLoc.city.split('/')[0];
    const cityTarget = targetLoc.city.split('/')[0];

    // Compute a proposed strategic counter (e.g. 75% of target benchmark or +20% parity bump)
    const proposedCounter = `${getCurrencySymbol(targetLoc.currency)}${formatNumber(pppEquivalentTargetCurrency * 0.85)}`;

    let script = '';

    if (currentNegotiationTone === 'collaborative') {
      script = `Subject: Discussion Regarding Offer Alignment — ${selectedRole} Compensation\n\n` +
`Hi [Hiring Manager / Talent Partner],\n\n` +
`Thank you again for extending the offer for the ${selectedRole} position. I am genuinely excited about the company's trajectory and the high-impact roadmap we discussed.\n\n` +
`Upon reviewing the proposed compensation of ${formattedBase} / year (~${formattedUsd} USD) against international purchasing power benchmarks, verified World Bank Purchasing Power Parity (ICP) data indicates that matching equivalent standard-of-living value in ${cityTarget} is approximately ${formattedPpp} USD.\n\n` +
`To ensure long-term alignment while still delivering substantial overhead savings compared to an on-site ${cityTarget} headcount (~25% below domestic payroll costs), I would like to propose an adjusted base compensation of ${proposedCounter} / year.\n\n` +
`I am confident this creates an equitable win-win structure and would be thrilled to sign and formalize our start date upon agreement.\n\n` +
`Best regards,\n[Your Name]\nParity Audit Verification: ${window.location.href}`;
    } else if (currentNegotiationTone === 'assertive') {
      script = `Subject: Objective Market Parity Audit & Proposed Compensation — ${selectedRole}\n\n` +
`Dear [Hiring Manager],\n\n` +
`Thank you for extending the offer for the ${selectedRole} role.\n\n` +
`To approach our compensation conversation objectively, I evaluated the offer against the World Bank International Comparison Program (PA.NUS.PPP) coefficient for ${homeLoc.country} (${homeLoc.pppFactor}):\n\n` +
`• Proposed Local Offer: ${formattedBase} / yr (~${formattedUsd} USD)\n` +
`• Standard of Living Equivalence in ${targetLoc.country}: ${formattedPpp} / yr\n` +
`• Purchasing Power Multiplier: ${multiplierFormatted}x\n\n` +
`Because this role delivers cross-border architectural value identical to an on-site engineer in ${cityTarget}, anchoring compensation strictly to domestic local rates discounts international talent. I propose adjusting base compensation to ${proposedCounter} / year, preserving a strong ~25% financial discount for your budget while reflecting fair global market parity.\n\n` +
`Let me know your availability for a brief conversation this week.\n\n` +
`Sincerely,\n[Your Name]\nAudit Reference: ${window.location.href}`;
    } else {
      // Executive Tone
      script = `Subject: Executive Compensation Proposal — ${selectedRole} Alignment\n\n` +
`Hi [Hiring Executive],\n\n` +
`I appreciate the offer for the ${selectedRole} role and look forward to partnering on the organization's technical milestones.\n\n` +
`Given the strategic scope of this mandate and my proven track record driving engineering velocity, I want to ensure our compensation terms reflect institutional market standards. While the initial offer of ${formattedBase} (~${formattedUsd} USD) reflects regional norms, independent World Bank parity data evaluates this output at ${formattedPpp} relative to ${cityTarget} benchmarks.\n\n` +
`I propose structuring base compensation at ${proposedCounter} / year. This package delivers high ROI for the company by securing senior technical leadership at a favorable margin below domestic rates.\n\n` +
`Looking forward to finalizing our partnership.\n\n` +
`Best,\n[Your Name]`;
    }

    negotiationScriptBox.value = script;
  }

  // Tone selector click handler
  if (negotiationToneToggle) {
    negotiationToneToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-tone]');
      if (!btn) return;
      currentNegotiationTone = btn.getAttribute('data-tone');

      // Update button visual states
      negotiationToneToggle.querySelectorAll('button').forEach(b => {
        b.className = "px-2.5 py-1 rounded text-[11px] font-semibold text-slate-400 hover:text-white cursor-pointer";
      });
      btn.className = "px-2.5 py-1 rounded text-[11px] font-bold bg-[#1D2A42] text-white cursor-pointer";

      // Recalculate script
      calculate();
    });
  }

  // Copy Negotiation Script Button
  if (copyScriptBtn) {
    copyScriptBtn.addEventListener('click', () => {
      if (!negotiationScriptBox) return;
      navigator.clipboard.writeText(negotiationScriptBox.value).then(() => {
        copyScriptBtnText.textContent = 'Script Copied!';
        showToast('Negotiation script copied to clipboard!');
        setTimeout(() => {
          copyScriptBtnText.textContent = 'Copy Negotiation Script';
        }, 2500);
      }).catch(() => {
        showToast('Failed to copy script.');
      });
    });
  }

  // --- Feature: Organic Community Poll Widget ---
  const pollContainer = document.getElementById('poll-options-container');
  const pollFeedbackMessage = document.getElementById('poll-feedback-message');
  const pollShareBtn = document.getElementById('poll-share-btn');
  const pollTotalVotesElem = document.getElementById('poll-total-votes');

  // Baseline poll distribution
  const pollVotes = {
    'opt-parity': 3640,
    'opt-discounted': 5650,
    'opt-underpaid': 2440,
    'opt-negotiated': 1112
  };

  function updatePollDisplay(userSelectedId = null) {
    if (!pollContainer) return;
    const total = Object.values(pollVotes).reduce((a, b) => a + b, 0);
    if (pollTotalVotesElem) pollTotalVotesElem.textContent = `${total.toLocaleString()} Votes Cast`;

    const cards = pollContainer.querySelectorAll('.poll-option-card');
    cards.forEach(card => {
      const id = card.getAttribute('data-poll-id');
      const votes = pollVotes[id] || 0;
      const pct = Math.round((votes / total) * 100);

      const fillBar = card.querySelector('.poll-bar-fill');
      const pctText = card.querySelector('.poll-percentage');

      if (fillBar) fillBar.style.width = `${pct}%`;
      if (pctText) pctText.textContent = `${pct}%`;

      if (id === userSelectedId) {
        card.classList.add('voted');
      } else {
        card.classList.remove('voted');
      }
    });
  }

  // Check saved poll vote in localStorage
  try {
    const savedVote = localStorage.getItem('equalpay_user_poll_vote');
    if (savedVote && pollVotes[savedVote] !== undefined) {
      updatePollDisplay(savedVote);
      if (pollFeedbackMessage) pollFeedbackMessage.textContent = 'Your vote is recorded in the community benchmark! Thank you for participating.';
    } else {
      updatePollDisplay();
    }
  } catch (err) {
    updatePollDisplay();
  }

  // Poll vote click handler
  if (pollContainer) {
    pollContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.poll-option-card');
      if (!card) return;
      const optId = card.getAttribute('data-poll-id');

      // Check if already voted
      const prevVote = localStorage.getItem('equalpay_user_poll_vote');
      if (prevVote === optId) {
        showToast('You already voted for this option!');
        return;
      }

      if (prevVote && pollVotes[prevVote]) {
        pollVotes[prevVote] = Math.max(0, pollVotes[prevVote] - 1);
      }

      pollVotes[optId] = (pollVotes[optId] || 0) + 1;
      localStorage.setItem('equalpay_user_poll_vote', optId);

      updatePollDisplay(optId);

      if (pollFeedbackMessage) {
        pollFeedbackMessage.innerHTML = '<span class="text-[#A3E635] font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> Vote recorded! Showing live crowd benchmark percentages.</span>';
      }

      if (window.confetti) {
        window.confetti({ particleCount: 30, spread: 50, origin: { y: 0.85 } });
      }

      showToast('Community vote recorded!');
    });
  }

  // Poll Share button
  if (pollShareBtn) {
    pollShareBtn.addEventListener('click', () => {
      const currentUrl = encodeURIComponent(window.location.origin + window.location.pathname);
      const text = encodeURIComponent("Was your last international remote salary offer fair? Vote in the live global developer benchmark on PayEquator Global:");
      const tweetUrl = `https://twitter.com/intent/tweet?text=${text}&url=${currentUrl}&hashtags=RemoteWork,TechSalary,PayEquator`;
      window.open(tweetUrl, '_blank', 'width=600,height=450');
    });
  }

  // --- 4. City Cost Swap & Chart Handler ---
  function updateCityCostSwap(homeLoc, targetLoc) {
    // Rent
    const rentDiff = ((homeLoc.rentIndex - targetLoc.rentIndex) / targetLoc.rentIndex) * 100;
    catRentDiff.textContent = `${rentDiff > 0 ? '+' : ''}${rentDiff.toFixed(1)}% ${rentDiff < 0 ? 'Cheaper at Home' : 'More Expensive'}`;
    catRentDiff.className = rentDiff < 0 ? "text-emerald-400 font-mono font-bold" : "text-rose-400 font-mono font-bold";
    barHomeRent.style.width = `${Math.min(homeLoc.rentIndex, 100)}%`;
    valHomeRent.textContent = homeLoc.rentIndex.toFixed(1);
    barTargetRent.style.width = `${Math.min(targetLoc.rentIndex, 100)}%`;
    valTargetRent.textContent = targetLoc.rentIndex.toFixed(1);

    // Groceries
    const grocDiff = ((homeLoc.groceriesIndex - targetLoc.groceriesIndex) / targetLoc.groceriesIndex) * 100;
    catGroceriesDiff.textContent = `${grocDiff > 0 ? '+' : ''}${grocDiff.toFixed(1)}% ${grocDiff < 0 ? 'Cheaper at Home' : 'More Expensive'}`;
    catGroceriesDiff.className = grocDiff < 0 ? "text-emerald-400 font-mono font-bold" : "text-rose-400 font-mono font-bold";
    barHomeGroceries.style.width = `${Math.min(homeLoc.groceriesIndex, 100)}%`;
    valHomeGroceries.textContent = homeLoc.groceriesIndex.toFixed(1);
    barTargetGroceries.style.width = `${Math.min(targetLoc.groceriesIndex, 100)}%`;
    valTargetGroceries.textContent = targetLoc.groceriesIndex.toFixed(1);

    // Dining
    const restDiff = ((homeLoc.restaurantIndex - targetLoc.restaurantIndex) / targetLoc.restaurantIndex) * 100;
    catRestaurantDiff.textContent = `${restDiff > 0 ? '+' : ''}${restDiff.toFixed(1)}% ${restDiff < 0 ? 'Cheaper at Home' : 'More Expensive'}`;
    catRestaurantDiff.className = restDiff < 0 ? "text-emerald-400 font-mono font-bold" : "text-rose-400 font-mono font-bold";
    barHomeRestaurant.style.width = `${Math.min(homeLoc.restaurantIndex, 100)}%`;
    valHomeRestaurant.textContent = homeLoc.restaurantIndex.toFixed(1);
    barTargetRestaurant.style.width = `${Math.min(targetLoc.restaurantIndex, 100)}%`;
    valTargetRestaurant.textContent = targetLoc.restaurantIndex.toFixed(1);

    // Update Chart.js
    renderCostChart(homeLoc, targetLoc);
  }

  function renderCostChart(homeLoc, targetLoc) {
    const ctx = document.getElementById('costComparisonChart');
    if (!ctx) return;

    const labels = ['Overall Cost', 'Rent & Housing', 'Groceries', 'Dining Out'];
    const homeData = [homeLoc.index, homeLoc.rentIndex, homeLoc.groceriesIndex, homeLoc.restaurantIndex];
    const targetData = [targetLoc.index, targetLoc.rentIndex, targetLoc.groceriesIndex, targetLoc.restaurantIndex];

    const isLightMode = document.documentElement.classList.contains('light-mode');

    if (costChart) {
      costChart.data.datasets[0].label = `${homeLoc.city.split('/')[0]} (Home)`;
      costChart.data.datasets[0].data = homeData;
      costChart.data.datasets[1].label = `${targetLoc.city.split('/')[0]} (Target)`;
      costChart.data.datasets[1].data = targetData;
      if (costChart.options && costChart.options.scales && costChart.options.scales.r) {
        costChart.options.scales.r.angleLines.color = isLightMode ? 'rgba(203, 213, 225, 0.8)' : 'rgba(38, 51, 77, 0.7)';
        costChart.options.scales.r.grid.color = isLightMode ? 'rgba(203, 213, 225, 0.8)' : 'rgba(38, 51, 77, 0.7)';
        costChart.options.scales.r.pointLabels.color = isLightMode ? '#0F172A' : '#94A3B8';
        costChart.options.scales.r.ticks.color = isLightMode ? '#475569' : '#64748B';
      }
      if (costChart.options && costChart.options.plugins && costChart.options.plugins.legend) {
        costChart.options.plugins.legend.labels.color = isLightMode ? '#0F172A' : '#E2E8F0';
      }
      costChart.update();
    } else {
      costChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: `${homeLoc.city.split('/')[0]} (Home)`,
              data: homeData,
              backgroundColor: 'rgba(16, 185, 129, 0.25)',
              borderColor: '#10B981',
              pointBackgroundColor: '#A3E635',
              pointBorderColor: '#fff',
              borderWidth: 2
            },
            {
              label: `${targetLoc.city.split('/')[0]} (Target)`,
              data: targetData,
              backgroundColor: 'rgba(56, 189, 248, 0.2)',
              borderColor: '#38BDF8',
              pointBackgroundColor: '#38BDF8',
              pointBorderColor: '#fff',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: isLightMode ? 'rgba(203, 213, 225, 0.8)' : 'rgba(38, 51, 77, 0.7)' },
              grid: { color: isLightMode ? 'rgba(203, 213, 225, 0.8)' : 'rgba(38, 51, 77, 0.7)' },
              pointLabels: {
                color: isLightMode ? '#0F172A' : '#94A3B8',
                font: { size: 10, family: "'Plus Jakarta Sans', sans-serif", weight: '600' }
              },
              ticks: {
                backdropColor: 'transparent',
                color: isLightMode ? '#475569' : '#64748B',
                font: { size: 9 }
              },
              min: 0,
              max: 130
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: isLightMode ? '#0F172A' : '#E2E8F0',
                font: { size: 11, family: "'Plus Jakarta Sans', sans-serif", weight: '600' },
                boxWidth: 12
              }
            }
          }
        }
      });
    }
  }

  // --- 5. Tax Net Estimator Handler (Using Specific Country Contractor Slabs) ---
  function updateTaxEstimator(rawSalary, homeLoc, targetLoc, currMeta, homeSymbol, targetSymbol, pppEquivalentTargetCurrency) {
    const effectiveHomeRate = isContractor ? homeLoc.contractorTaxRate : homeLoc.employeeTaxRate;
    const effectiveTargetRate = isContractor ? targetLoc.contractorTaxRate : targetLoc.employeeTaxRate;

    const homeTaxDeduction = rawSalary * (effectiveHomeRate / 100);
    const homeNetAnnual = rawSalary - homeTaxDeduction;
    const homeNetMonthly = homeNetAnnual / 12;

    const targetTaxDeduction = pppEquivalentTargetCurrency * (effectiveTargetRate / 100);
    const targetNetAnnual = pppEquivalentTargetCurrency - targetTaxDeduction;

    taxHomeGross.textContent = `${homeSymbol}${formatNumber(rawSalary)}`;
    taxHomeTaxAmount.textContent = `-${homeSymbol}${formatNumber(homeTaxDeduction)}`;
    taxHomeRatePercent.textContent = `${effectiveHomeRate.toFixed(1)}% (${isContractor ? 'Contractor Slab' : 'Employee Slab'})`;
    taxHomeNet.textContent = `${homeSymbol}${formatNumber(homeNetAnnual)}`;
    taxHomeNetMonthly.textContent = `${homeSymbol}${formatNumber(homeNetMonthly)} / mo`;

    const homeNetUsdMonthly = (homeNetAnnual * currMeta.rateToUSD) / 12;
    taxHomeNetUsd.textContent = `~$${formatNumber(homeNetUsdMonthly)} / mo`;

    taxTargetNetNeeded.textContent = `${targetSymbol}${formatNumber(targetNetAnnual)}`;
    taxTargetTaxAmount.textContent = `-${targetSymbol}${formatNumber(targetTaxDeduction)} (${effectiveTargetRate.toFixed(1)}%)`;
    taxTargetGrossReq.textContent = `${targetSymbol}${formatNumber(pppEquivalentTargetCurrency)}`;
  }

  // --- 6. Event Handlers & Micro-interactions ---
  
  // Format salary input on user typing
  salaryInput.addEventListener('input', (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    if (rawVal) {
      const num = parseInt(rawVal, 10);
      e.target.value = num.toLocaleString('en-US');
    }
    calculate();
  });

  currencySelect.addEventListener('change', calculate);
  
  roleSelect.addEventListener('change', () => {
    const selectedLoc = PPP_DATA.locations.find(l => l.id === currentHomeId);
    if (selectedLoc) {
      const role = roleSelect.value;
      const typicalSalary = selectedLoc.roleBenchmarks[role] || 100000;
      salaryInput.value = formatNumber(typicalSalary);
    }
    calculate();
  });

  // Calculator Form Submit
  calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculate();
    const resultsElem = document.getElementById('results-dashboard');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Quick salary presets (Mid, Senior, Staff)
  salaryPresets.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-preset]');
    if (!btn) return;
    const preset = btn.getAttribute('data-preset');
    const selectedLoc = PPP_DATA.locations.find(l => l.id === currentHomeId);
    if (!selectedLoc) return;

    let targetRole = 'Senior Software Engineer';
    if (preset === 'junior') targetRole = 'Mid-level Software Engineer';
    if (preset === 'staff') targetRole = 'Staff / Lead Engineer';

    roleSelect.value = targetRole;
    const salary = selectedLoc.roleBenchmarks[targetRole] || 100000;
    salaryInput.value = formatNumber(salary);
    calculate();
  });

  // Annual vs Monthly Toggles
  toggleAnnual.addEventListener('click', () => {
    currentPeriod = 'annual';
    toggleAnnual.className = "px-3 py-1 rounded-md text-xs font-semibold bg-[#10B981] text-slate-900 shadow transition-all";
    toggleMonthly.className = "px-3 py-1 rounded-md text-xs font-semibold text-slate-400 hover:text-white transition-all";
    calculate();
  });

  toggleMonthly.addEventListener('click', () => {
    currentPeriod = 'monthly';
    toggleMonthly.className = "px-3 py-1 rounded-md text-xs font-semibold bg-[#10B981] text-slate-900 shadow transition-all";
    toggleAnnual.className = "px-3 py-1 rounded-md text-xs font-semibold text-slate-400 hover:text-white transition-all";
    calculate();
  });

  // Tax Mode Toggles (Employee vs Contractor)
  taxModeEmp.addEventListener('click', () => {
    isContractor = false;
    taxModeEmp.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1D2A42] text-white";
    taxModeContractor.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white";
    calculate();
  });

  taxModeContractor.addEventListener('click', () => {
    isContractor = true;
    taxModeContractor.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1D2A42] text-[#A3E635]";
    taxModeEmp.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white";
    calculate();
  });

  // Jump to scorecard button
  jumpToScorecard.addEventListener('click', () => {
    const scSection = document.getElementById('scorecard-section');
    if (scSection) {
      scSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  quickShareBtn.addEventListener('click', () => {
    const scSection = document.getElementById('scorecard-section');
    if (scSection) {
      scSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // --- Helper: Canvas Rounded Rectangle ---
  function drawCanvasRoundRect(ctx, x, y, width, height, radius, fill = false, stroke = false) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  // --- 7. Interactive 1200x630 Branded Social Card Export (Open Graph) ---
  function exportScorecard1200x630() {
    const rawSalary = parseFormattedNumber(salaryInput.value);
    const selectedCurrency = currencySelect.value;
    const selectedRole = roleSelect.value;

    const homeLoc = PPP_DATA.locations.find(l => l.id === currentHomeId) || PPP_DATA.locations[2];
    const targetLoc = PPP_DATA.locations.find(l => l.id === currentTargetId) || PPP_DATA.locations[0];

    const multiplier = targetLoc.index / homeLoc.index;
    const multiplierFormatted = multiplier.toFixed(2);
    const currMeta = PPP_DATA.currencies[selectedCurrency] || { rateToUSD: 1 };
    const homeCurrencyMeta = PPP_DATA.currencies[homeLoc.currency] || { rateToUSD: 1 };
    const targetCurrencyMeta = PPP_DATA.currencies[targetLoc.currency] || { rateToUSD: 1 };

    const amountInUSD = rawSalary * currMeta.rateToUSD;
    const salaryInHomeCurrency = (amountInUSD / homeCurrencyMeta.rateToUSD);
    const pppEquivalentTargetCurrency = (salaryInHomeCurrency / homeLoc.pppFactor) * targetLoc.pppFactor;
    const nominalTargetCurrency = (amountInUSD / targetCurrencyMeta.rateToUSD);

    const targetSymbol = getCurrencySymbol(targetLoc.currency);
    const homeSymbol = getCurrencySymbol(selectedCurrency);

    const roleTargetBenchmark = targetLoc.roleBenchmarks[selectedRole] || 150000;
    const fairPercent = Math.min(Math.round((pppEquivalentTargetCurrency / roleTargetBenchmark) * 100), 160);
    const pppAdvantagePercent = Math.round(((pppEquivalentTargetCurrency - nominalTargetCurrency) / (nominalTargetCurrency || 1)) * 100);

    const taxRate = isContractor ? homeLoc.contractorTaxRate : homeLoc.employeeTaxRate;

    let standingText = 'Competitive Global Parity';
    let standingColor = '#38BDF8';
    if (fairPercent < 75) {
      standingText = 'Discounted / Underpaid';
      standingColor = '#F43F5E';
    } else if (fairPercent > 110) {
      standingText = 'Tier-1 Elite Compensation';
      standingColor = '#A3E635';
    }

    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Create 1200x630 Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // 1. Background Fill (#0B0F19)
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Subtle Grid Pattern
    ctx.strokeStyle = 'rgba(38, 51, 77, 0.22)';
    ctx.lineWidth = 1;
    for (let x = 40; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 40; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // 3. Ambient Radial Glows
    const glow1 = ctx.createRadialGradient(200, 120, 10, 200, 120, 360);
    glow1.addColorStop(0, 'rgba(16, 185, 129, 0.16)');
    glow1.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, 1200, 630);

    const glow2 = ctx.createRadialGradient(1020, 500, 10, 1020, 500, 380);
    glow2.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
    glow2.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, 1200, 630);

    // 4. Outer Border
    ctx.strokeStyle = '#26334D';
    ctx.lineWidth = 2;
    drawCanvasRoundRect(ctx, 1, 1, 1198, 628, 20, false, true);

    // 5. Top Holographic Strip (6px)
    const topGrad = ctx.createLinearGradient(0, 0, 1200, 0);
    topGrad.addColorStop(0, '#10B981');
    topGrad.addColorStop(0.5, '#A3E635');
    topGrad.addColorStop(1, '#38BDF8');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, 1200, 6);

    // 6. Header Area
    // Logo Icon Box
    ctx.fillStyle = '#161F30';
    ctx.strokeStyle = 'rgba(163, 230, 53, 0.5)';
    ctx.lineWidth = 1.5;
    drawCanvasRoundRect(ctx, 60, 42, 48, 48, 12, true, true);

    // Icon (Scale / balance glyph)
    ctx.fillStyle = '#A3E635';
    ctx.font = '24px "Inter", -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚖', 84, 66);

    // Brand Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px "Inter", -apple-system, sans-serif';
    ctx.fillText('PayEquator Global', 122, 58);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText('Purchasing Power Parity Intelligence', 122, 80);

    // "VERIFIED AUDIT" Badge
    ctx.fillStyle = '#A3E635';
    drawCanvasRoundRect(ctx, 318, 44, 110, 22, 6, true, false);
    ctx.fillStyle = '#05130B';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFIED AUDIT', 373, 55);

    // Right Header: Percentile Badge
    const badgeText = fairPercent >= 115 ? 'Top 5% Global PPP' : fairPercent >= 90 ? 'Top 15% Local PPP' : 'Competitive Band';
    ctx.fillStyle = 'rgba(163, 230, 53, 0.12)';
    ctx.strokeStyle = '#A3E635';
    ctx.lineWidth = 1;
    drawCanvasRoundRect(ctx, 970, 44, 170, 28, 14, true, true);
    ctx.fillStyle = '#A3E635';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(badgeText, 1055, 58);

    ctx.fillStyle = '#64748B';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('World Bank ICP 2024–2026', 1140, 88);

    // Horizontal Divider
    ctx.strokeStyle = '#26334D';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 108);
    ctx.lineTo(1140, 108);
    ctx.stroke();

    // 7. Assessment & Route Banner
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('TARGET ROLE ASSESSMENT', 60, 136);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px "Inter", -apple-system, sans-serif';
    ctx.fillText(selectedRole, 60, 170);

    // Right Route & Multiplier
    ctx.textAlign = 'right';
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(`${homeLoc.country} (${homeLoc.city.split('/')[0]})  →  ${targetLoc.country}`, 1140, 150);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(`${multiplierFormatted}x Cost Differential Multiplier`, 1140, 172);

    // 8. Two Comparison Cards (Side by Side)
    // Card Dimensions: x1=60, x2=615, w=525, h=215
    const cardY = 195;
    const cardW = 525;
    const cardH = 215;

    // Left Card: Base Local Offer
    ctx.fillStyle = 'rgba(22, 31, 48, 0.85)';
    ctx.strokeStyle = '#26334D';
    ctx.lineWidth = 1;
    drawCanvasRoundRect(ctx, 60, cardY, cardW, cardH, 16, true, true);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('LOCAL BASE COMPENSATION (PRE-TAX)', 85, cardY + 34);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.fillText(`${homeSymbol}${formatNumber(rawSalary)} / yr`, 85, cardY + 84);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillText(`~$${formatNumber(amountInUSD)} Nominal FX Equivalent`, 85, cardY + 118);

    // Mini Tax Slab Pill
    ctx.fillStyle = '#0B0F19';
    ctx.strokeStyle = '#26334D';
    ctx.lineWidth = 1;
    drawCanvasRoundRect(ctx, 85, cardY + 144, 250, 32, 8, true, true);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`Local Tax Slab: ~${taxRate.toFixed(1)}% (${isContractor ? 'Contractor' : 'Emp'})`, 98, cardY + 164);

    // Right Card: Equivalent PPP Value
    ctx.fillStyle = 'rgba(29, 42, 66, 0.9)';
    ctx.strokeStyle = 'rgba(163, 230, 53, 0.45)';
    ctx.lineWidth = 1.5;
    drawCanvasRoundRect(ctx, 615, cardY, cardW, cardH, 16, true, true);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#A3E635';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('TRUE EQUIVALENT PURCHASING POWER (PPP)', 640, cardY + 34);

    ctx.fillStyle = '#A3E635';
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillText(`${targetSymbol}${formatNumber(pppEquivalentTargetCurrency)} / yr`, 640, cardY + 84);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(`${multiplierFormatted}x Real Lifestyle Multiplier`, 640, cardY + 118);

    // Mini Leverage Pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.lineWidth = 1;
    drawCanvasRoundRect(ctx, 640, cardY + 144, 280, 32, 8, true, true);
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`+${Math.max(0, pppAdvantagePercent)}% Real-World Purchasing Leverage`, 655, cardY + 164);

    // 9. Parity Standing Bar & Insight
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px "Inter", -apple-system, sans-serif';
    ctx.fillText(`Global Parity Standing: ${standingText}`, 60, 450);

    ctx.textAlign = 'right';
    ctx.fillStyle = standingColor;
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText(`${fairPercent}% of Benchmark`, 1140, 450);

    // Background Bar
    ctx.fillStyle = '#161F30';
    ctx.strokeStyle = '#26334D';
    ctx.lineWidth = 1;
    drawCanvasRoundRect(ctx, 60, 464, 1080, 14, 7, true, true);

    // Progress Bar Fill
    const barFillWidth = Math.max(14, (Math.min(fairPercent, 100) / 100) * 1080);
    const barGrad = ctx.createLinearGradient(60, 0, 1140, 0);
    barGrad.addColorStop(0, '#38BDF8');
    barGrad.addColorStop(0.5, '#10B981');
    barGrad.addColorStop(1, '#A3E635');
    ctx.fillStyle = barGrad;
    drawCanvasRoundRect(ctx, 60, 464, barFillWidth, 14, 7, true, false);

    // Insight Subtext
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px "Inter", sans-serif';
    const pppInHomeUnits = (homeLoc.pppFactor / targetLoc.pppFactor).toFixed(2);
    ctx.fillText(`Arbitrage Insight: 1.00 ${targetLoc.currency} in ${targetLoc.city.split('/')[0]} has purchasing equivalence of ~${pppInHomeUnits} ${homeLoc.currency} in ${homeLoc.city.split('/')[0]}.`, 60, 506);

    // 10. Watermark & Footer
    ctx.strokeStyle = '#26334D';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 532);
    ctx.lineTo(1140, 532);
    ctx.stroke();

    // Left Watermark
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748B';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText('🔒 Calculated via PayEquator.com • Zero-Latency Parity Architecture', 60, 574);

    // Right Watermark
    ctx.textAlign = 'right';
    ctx.fillStyle = '#A3E635';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`1200x630 Open Graph Card • ${dateFormatted} Audit`, 1140, 574);

    // Trigger Direct PNG Download
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `PayEquator-Scorecard-1200x630-${selectedRole.replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    // Micro Confetti & Toast
    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A3E635', '#10B981', '#38BDF8']
      });
    }

    showToast('Branded 1200x630 OG Result Card downloaded!');
  }

  // --- 8. Scorecard Action Button Bindings ---
  downloadCardBtn.addEventListener('click', () => {
    try {
      downloadCardBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Rendering OG Card...';
      setTimeout(() => {
        exportScorecard1200x630();
        downloadCardBtn.innerHTML = '<i class="fa-solid fa-camera"></i> <span>Download Result Card (1200x630 OG)</span>';
      }, 80);
    } catch (err) {
      console.error(err);
      showToast('Export failed, please try again.');
      downloadCardBtn.innerHTML = '<i class="fa-solid fa-camera"></i> <span>Download Result Card (1200x630 OG)</span>';
    }
  });

  // Share on LinkedIn
  shareLinkedinBtn.addEventListener('click', () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`I just evaluated my global remote salary on PayEquator Global! Discover your true Purchasing Power Parity:`);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&summary=${title}`;
    window.open(shareUrl, '_blank', 'width=600,height=500');
  });

  // Share on Twitter / X
  shareTwitterBtn.addEventListener('click', () => {
    const pppVal = pppAdjustedAmount.textContent;
    const role = roleSelect.value;
    const text = encodeURIComponent(`Calculated my remote ${role} salary parity with World Bank PPP data: equivalent to ${pppVal} in US purchasing power! 🚀 Check your true value:`);
    const url = encodeURIComponent(window.location.href);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=RemoteWork,TechSalary,PayEquator,PPP`;
    window.open(tweetUrl, '_blank', 'width=600,height=450');
  });

  // Copy shareable link with query parameters
  copyLinkBtn.addEventListener('click', () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('salary', parseFormattedNumber(salaryInput.value));
    url.searchParams.set('curr', currencySelect.value);
    url.searchParams.set('home', currentHomeId);
    url.searchParams.set('target', currentTargetId);
    url.searchParams.set('role', roleSelect.value);

    navigator.clipboard.writeText(url.toString()).then(() => {
      copyBtnText.textContent = 'Link Copied!';
      showToast('Shareable audit URL copied to clipboard!');
      setTimeout(() => {
        copyBtnText.textContent = 'Copy Audit Link';
      }, 2500);
    }).catch(() => {
      showToast('Failed to copy link.');
    });
  });

  // --- 8. URL Query Params Initializer ---
  function loadQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('home')) {
      const match = PPP_DATA.locations.find(l => l.id === params.get('home'));
      if (match) {
        currentHomeId = match.id;
        updateComboboxDisplay('home');
      }
    }
    if (params.has('target')) {
      const match = PPP_DATA.locations.find(l => l.id === params.get('target'));
      if (match) {
        currentTargetId = match.id;
        updateComboboxDisplay('target');
      }
    }
    if (params.has('curr')) currencySelect.value = params.get('curr');
    if (params.has('role')) roleSelect.value = params.get('role');
    if (params.has('salary')) {
      const num = parseFormattedNumber(params.get('salary'));
      if (num > 0) salaryInput.value = formatNumber(num);
    }
  }

  // --- 9. Modal Management Architecture (Privacy, Methodology, Terms & Contact) ---
  const privacyModal = document.getElementById('privacy-modal');
  const closePrivacyBtn = document.getElementById('close-privacy-btn');
  const modalPrivacyCloseBtn = document.getElementById('modal-privacy-close-btn');

  const termsContactModal = document.getElementById('terms-contact-modal');
  const closeTermsContactBtn = document.getElementById('close-terms-contact-btn');
  const modalTermsCloseBtn = document.getElementById('modal-terms-close-btn');
  const modalTabTerms = document.getElementById('modal-tab-terms');
  const modalTabContact = document.getElementById('modal-tab-contact');
  const modalContentTerms = document.getElementById('modal-content-terms');
  const modalContentContact = document.getElementById('modal-content-contact');
  const contactForm = document.getElementById('contact-form');

  // Generic Modal open/close helpers
  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    closeModal(privacyModal);
    closeModal(methodologyModal);
    closeModal(termsContactModal);
  }

  // Methodology Modal Handlers
  openMethodologyBtn.addEventListener('click', () => openModal(methodologyModal));
  if (footerMethodologyBtn) footerMethodologyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(methodologyModal);
  });
  const footerDisclaimerBtn = document.getElementById('footer-disclaimer-btn');
  if (footerDisclaimerBtn) footerDisclaimerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(methodologyModal);
  });
  if (closeMethodologyBtn) closeMethodologyBtn.addEventListener('click', () => closeModal(methodologyModal));
  if (modalGotItBtn) modalGotItBtn.addEventListener('click', () => closeModal(methodologyModal));

  // Privacy Policy & Cookies Modal Handlers
  const footerPrivacyBtn = document.getElementById('footer-privacy-btn');
  const footerAdSenseBtn = document.getElementById('footer-adsense-btn');
  const footerQuickPrivacy = document.getElementById('footer-quick-privacy');

  if (footerPrivacyBtn) footerPrivacyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });
  if (footerAdSenseBtn) footerAdSenseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });
  if (footerQuickPrivacy) footerQuickPrivacy.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });
  if (closePrivacyBtn) closePrivacyBtn.addEventListener('click', () => closeModal(privacyModal));
  if (modalPrivacyCloseBtn) modalPrivacyCloseBtn.addEventListener('click', () => closeModal(privacyModal));

  // Terms & Contact Modal Handlers
  function switchTermsTab(activeTab) {
    if (activeTab === 'terms') {
      modalTabTerms.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#1D2A42] text-white transition-colors";
      modalTabContact.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors";
      modalContentTerms.classList.remove('hidden');
      modalContentContact.classList.add('hidden');
    } else {
      modalTabContact.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#1D2A42] text-[#A3E635] transition-colors";
      modalTabTerms.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors";
      modalContentContact.classList.remove('hidden');
      modalContentTerms.classList.add('hidden');
    }
  }

  if (modalTabTerms) modalTabTerms.addEventListener('click', () => switchTermsTab('terms'));
  if (modalTabContact) modalTabContact.addEventListener('click', () => switchTermsTab('contact'));

  const footerTermsBtn = document.getElementById('footer-terms-btn');
  const footerContactBtn = document.getElementById('footer-contact-btn');
  const footerQuickTerms = document.getElementById('footer-quick-terms');
  const footerQuickContact = document.getElementById('footer-quick-contact');

  if (footerTermsBtn) footerTermsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchTermsTab('terms');
    openModal(termsContactModal);
  });
  if (footerQuickTerms) footerQuickTerms.addEventListener('click', (e) => {
    e.preventDefault();
    switchTermsTab('terms');
    openModal(termsContactModal);
  });
  if (footerContactBtn) footerContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchTermsTab('contact');
    openModal(termsContactModal);
  });
  if (footerQuickContact) footerQuickContact.addEventListener('click', (e) => {
    e.preventDefault();
    switchTermsTab('contact');
    openModal(termsContactModal);
  });
  if (closeTermsContactBtn) closeTermsContactBtn.addEventListener('click', () => closeModal(termsContactModal));
  if (modalTermsCloseBtn) modalTermsCloseBtn.addEventListener('click', () => closeModal(termsContactModal));

  // Contact Form Submission Overlay
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'User';
      showToast(`Thank you ${name}! Your inquiry has been submitted.`);
      contactForm.reset();
      setTimeout(() => {
        closeModal(termsContactModal);
      }, 1200);
    });
  }

  // Backdrop click to dismiss
  [privacyModal, methodologyModal, termsContactModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Global Escape Key to close all open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Mobile Nav Menu Toggle
  const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileMethodologyBtn = document.getElementById('mobile-methodology-btn');

  if (mobileMenuToggleBtn && mobileNavMenu) {
    mobileMenuToggleBtn.addEventListener('click', () => {
      const isClosed = mobileNavMenu.classList.contains('hidden');
      if (isClosed) {
        mobileNavMenu.classList.remove('hidden');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-xmark';
      } else {
        mobileNavMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-bars';
      }
    });

    // Close on clicking any link
    mobileNavMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-bars';
      });
    });

    if (mobileMethodologyBtn) {
      mobileMethodologyBtn.addEventListener('click', () => {
        mobileNavMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fa-solid fa-bars';
        openModal(methodologyModal);
      });
    }
  }

  // --- 10. Smooth Dark / Light Mode Theme Switch & System Sync ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');

  function getPreferredTheme() {
    const saved = localStorage.getItem('payequator_theme') || localStorage.getItem('equalpay_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
      if (themeToggleIcon) themeToggleIcon.className = 'fa-solid fa-sun text-amber-500';
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
      if (themeToggleIcon) themeToggleIcon.className = 'fa-solid fa-moon text-[#A3E635]';
    }
    
    // Synchronize Chart.js palette with theme
    if (costChart && costChart.options && costChart.options.scales && costChart.options.scales.r) {
      costChart.options.scales.r.angleLines.color = isLight ? 'rgba(203, 213, 225, 0.8)' : 'rgba(38, 51, 77, 0.7)';
      costChart.options.scales.r.grid.color = isLight ? 'rgba(203, 213, 225, 0.8)' : 'rgba(38, 51, 77, 0.7)';
      costChart.options.scales.r.pointLabels.color = isLight ? '#0F172A' : '#94A3B8';
      costChart.options.scales.r.ticks.color = isLight ? '#475569' : '#64748B';
      if (costChart.options.plugins && costChart.options.plugins.legend) {
        costChart.options.plugins.legend.labels.color = isLight ? '#0F172A' : '#E2E8F0';
      }
      costChart.update();
    }
  }

  // Load and apply initial theme
  applyTheme(getPreferredTheme());

  // Listen to OS system color scheme changes (when no manual override is saved)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      const hasManualChoice = localStorage.getItem('payequator_theme') || localStorage.getItem('equalpay_theme');
      if (!hasManualChoice) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      const nextTheme = isLight ? 'dark' : 'light';
      localStorage.setItem('payequator_theme', nextTheme);
      localStorage.setItem('equalpay_theme', nextTheme);
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme === 'light' ? 'Light Mode' : 'Dark Fintech'} theme`);
    });
  }

  // --- 11. Download Compensation Brief (Print-to-PDF) ---
  const downloadBriefPdfBtn = document.getElementById('download-brief-pdf-btn');
  if (downloadBriefPdfBtn) {
    downloadBriefPdfBtn.addEventListener('click', () => {
      const printDateStamp = document.getElementById('print-date-stamp');
      if (printDateStamp) {
        const d = new Date();
        printDateStamp.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      showToast('Preparing 1-Page Executive Compensation Brief...');
      setTimeout(() => {
        window.print();
      }, 250);
    });
  }

  // --- 12. Live Community Salary Feed (Crowdsourced Data) ---
  const subHomeCountrySelect = document.getElementById('sub-home-country');
  const communitySalaryForm = document.getElementById('community-salary-form');
  const communityFeedList = document.getElementById('community-feed-list');
  const feedRoleFilter = document.getElementById('feed-role-filter');
  const feedLiveCount = document.getElementById('feed-live-count');
  const feedToggleRecent = document.getElementById('feed-toggle-recent');
  const feedTogglePppSpread = document.getElementById('feed-toggle-ppp-spread');

  // Populate submission home country options
  if (subHomeCountrySelect && window.PPP_DATA && PPP_DATA.locations) {
    subHomeCountrySelect.innerHTML = PPP_DATA.locations.map(loc => {
      return `<option value="${loc.id}">${loc.country} ${loc.flag}</option>`;
    }).join('');
  }

  // Seed submissions list
  const DEFAULT_COMMUNITY_SUBMISSIONS = [
    {
      id: 'sub-1',
      role: 'Full-Stack Engineer',
      exp: '3-5 yrs',
      contractType: 'B2B Contractor',
      homeId: 'india',
      employer: 'United States',
      employerFlag: '🇺🇸',
      monthlyPay: 4200,
      timestamp: '14 mins ago'
    },
    {
      id: 'sub-2',
      role: 'DevOps & SRE',
      exp: '6-9 yrs',
      contractType: 'B2B Contractor',
      homeId: 'poland',
      employer: 'United States',
      employerFlag: '🇺🇸',
      monthlyPay: 6500,
      timestamp: '42 mins ago'
    },
    {
      id: 'sub-3',
      role: 'Backend Engineer',
      exp: '3-5 yrs',
      contractType: 'B2B Contractor',
      homeId: 'brazil',
      employer: 'United Kingdom',
      employerFlag: '🇬🇧',
      monthlyPay: 4800,
      timestamp: '2 hours ago'
    },
    {
      id: 'sub-4',
      role: 'Frontend Developer',
      exp: '1-2 yrs',
      contractType: 'B2B Contractor',
      homeId: 'pakistan',
      employer: 'Canada',
      employerFlag: '🇨🇦',
      monthlyPay: 2900,
      timestamp: '3 hours ago'
    },
    {
      id: 'sub-5',
      role: 'Mobile Engineer',
      exp: '3-5 yrs',
      contractType: 'Direct EOR Payroll',
      homeId: 'philippines',
      employer: 'Australia',
      employerFlag: '🇦🇺',
      monthlyPay: 3400,
      timestamp: '5 hours ago'
    },
    {
      id: 'sub-6',
      role: 'Data & AI Engineer',
      exp: '6-9 yrs',
      contractType: 'B2B Contractor',
      homeId: 'nigeria',
      employer: 'Germany',
      employerFlag: '🇩🇪',
      monthlyPay: 4500,
      timestamp: '7 hours ago'
    }
  ];

  function getStoredSubmissions() {
    try {
      const stored = localStorage.getItem('equalpay_community_salaries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  let activeFeedMode = 'recent'; // 'recent' or 'ppp_spread'

  function renderCommunityFeed() {
    if (!communityFeedList) return;
    const userSubmissions = getStoredSubmissions();
    const allSubmissions = [...userSubmissions, ...DEFAULT_COMMUNITY_SUBMISSIONS];
    const selectedRole = feedRoleFilter ? feedRoleFilter.value : 'all';

    const filtered = selectedRole === 'all' 
      ? allSubmissions 
      : allSubmissions.filter(s => s.role === selectedRole);

    if (feedLiveCount) {
      feedLiveCount.textContent = `${allSubmissions.length + 142} Verified Reports`;
    }

    if (filtered.length === 0) {
      communityFeedList.innerHTML = `
        <div class="text-center py-8 text-xs text-slate-400">
          No submissions found for role "${selectedRole}". Be the first to report!
        </div>
      `;
      return;
    }

    if (activeFeedMode === 'ppp_spread') {
      // Group by home country and display average vs US parity
      const countryGroups = {};
      filtered.forEach(sub => {
        if (!countryGroups[sub.homeId]) {
          countryGroups[sub.homeId] = { count: 0, totalPay: 0 };
        }
        countryGroups[sub.homeId].count += 1;
        countryGroups[sub.homeId].totalPay += sub.monthlyPay;
      });

      communityFeedList.innerHTML = Object.keys(countryGroups).map(homeId => {
        const loc = PPP_DATA.locations.find(l => l.id === homeId) || { name: homeId, country: homeId, flag: '🌐', ppp: 25.0, colIndex: 30 };
        const avgMonthly = Math.round(countryGroups[homeId].totalPay / countryGroups[homeId].count);
        const annualUsd = avgMonthly * 12;
        const pppShare = Math.round(annualUsd / ((loc.colIndex || 30) / 100));

        return `
          <div class="p-3.5 rounded-xl bg-[#0B0F19]/90 border border-[#26334D] flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">${loc.flag}</span>
              <div>
                <div class="text-xs font-bold text-white">${loc.country} Remote Averages</div>
                <div class="text-[11px] text-slate-400">${countryGroups[homeId].count} submissions &bull; Cost Index: ${loc.colIndex}/100</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-mono font-bold text-[#A3E635]">$${formatNumber(avgMonthly)} / mo</div>
              <div class="text-[10px] text-sky-400 font-mono">~$${formatNumber(pppShare)} / yr US Parity Equivalent</div>
            </div>
          </div>
        `;
      }).join('');
      return;
    }

    // Default Recent Stream
    communityFeedList.innerHTML = filtered.map(sub => {
      const loc = PPP_DATA.locations.find(l => l.id === sub.homeId) || { name: 'Global Hub', country: 'Global Hub', flag: '🌐', colIndex: 30 };
      const annualPay = sub.monthlyPay * 12;
      const isRecent = sub.timestamp.includes('min') || sub.timestamp.includes('Just now');

      return `
        <div class="p-3.5 rounded-xl bg-[#0B0F19]/90 border ${isRecent ? 'border-[#A3E635]/50 shadow-sm' : 'border-[#26334D]'} hover:border-[#38BDF8]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#161F30] text-white border border-[#26334D]">
                ${sub.role}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">${sub.exp}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">${sub.contractType}</span>
            </div>
            <div class="text-xs text-slate-300 flex items-center gap-2">
              <span class="font-medium">${loc.flag} ${loc.country}</span>
              <i class="fa-solid fa-arrow-right text-[10px] text-slate-500"></i>
              <span class="font-medium">${sub.employerFlag || '🌐'} ${sub.employer}</span>
            </div>
          </div>
          <div class="text-left sm:text-right shrink-0">
            <div class="text-sm sm:text-base font-mono font-extrabold text-[#A3E635]">
              $${formatNumber(sub.monthlyPay)} <span class="text-[11px] text-slate-400 font-normal">/ mo</span>
            </div>
            <div class="flex items-center sm:justify-end gap-1.5 text-[10px] text-slate-400 font-mono">
              <span>$${formatNumber(annualPay)}/yr</span>
              <span>&bull;</span>
              <span class="text-slate-500">${sub.timestamp}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (feedRoleFilter) {
    feedRoleFilter.addEventListener('change', renderCommunityFeed);
  }

  if (feedToggleRecent && feedTogglePppSpread) {
    feedToggleRecent.addEventListener('click', () => {
      activeFeedMode = 'recent';
      feedToggleRecent.className = 'px-2.5 py-1 rounded bg-[#161F30] text-white font-bold cursor-pointer transition-colors';
      feedTogglePppSpread.className = 'px-2.5 py-1 rounded text-slate-400 hover:text-white cursor-pointer transition-colors';
      renderCommunityFeed();
    });

    feedTogglePppSpread.addEventListener('click', () => {
      activeFeedMode = 'ppp_spread';
      feedTogglePppSpread.className = 'px-2.5 py-1 rounded bg-[#161F30] text-white font-bold cursor-pointer transition-colors';
      feedToggleRecent.className = 'px-2.5 py-1 rounded text-slate-400 hover:text-white cursor-pointer transition-colors';
      renderCommunityFeed();
    });
  }

  // Handle Form Submission
  if (communitySalaryForm) {
    communitySalaryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('sub-role')?.value || 'Full-Stack Engineer';
      const exp = document.getElementById('sub-exp')?.value || '3-5 yrs';
      const contractType = document.getElementById('sub-contract-type')?.value || 'B2B Contractor';
      const homeId = document.getElementById('sub-home-country')?.value || 'india';
      const employer = document.getElementById('sub-employer-country')?.value || 'United States';
      const monthlyPay = parseInt(document.getElementById('sub-monthly-pay')?.value, 10);

      if (!monthlyPay || monthlyPay < 500) {
        showToast('Please enter a valid monthly salary ($500+ USD).');
        return;
      }

      let empFlag = '🇺🇸';
      if (employer.includes('United Kingdom')) empFlag = '🇬🇧';
      else if (employer.includes('Germany')) empFlag = '🇩🇪';
      else if (employer.includes('Canada')) empFlag = '🇨🇦';
      else if (employer.includes('Singapore')) empFlag = '🇸🇬';
      else if (employer.includes('Australia')) empFlag = '🇦🇺';
      else if (employer.includes('Netherlands')) empFlag = '🇳🇱';
      else if (employer.includes('UAE')) empFlag = '🇦🇪';

      const newSubmission = {
        id: 'sub-' + Date.now(),
        role,
        exp,
        contractType,
        homeId,
        employer,
        employerFlag: empFlag,
        monthlyPay,
        timestamp: 'Just now'
      };

      const existing = getStoredSubmissions();
      existing.unshift(newSubmission);
      localStorage.setItem('equalpay_community_salaries', JSON.stringify(existing));

      if (window.confetti) {
        window.confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#A3E635', '#A855F7', '#38BDF8']
        });
      }

      showToast(`Thank you! Your anonymous ${role} report was added to the live feed.`);
      communitySalaryForm.reset();
      renderCommunityFeed();
    });
  }



  // --- 14. Programmatic Dynamic Comparison Corridors ---
  const corridorsGrid = document.getElementById('corridors-grid');

  function renderCorridors() {
    if (!corridorsGrid || !PPP_DATA.corridors) return;

    corridorsGrid.innerHTML = PPP_DATA.corridors.map(c => {
      const homeLoc = PPP_DATA.locations.find(l => l.id === c.homeId);
      const targetLoc = PPP_DATA.locations.find(l => l.id === c.targetId);
      const homeFlag = homeLoc?.flag || c.homeFlag;
      const targetFlag = targetLoc?.flag || c.targetFlag;
      const colDiff = targetLoc && homeLoc ? Math.round(((targetLoc.index - homeLoc.index) / homeLoc.index) * 100) : 100;

      return `
        <div class="corridor-card group" data-corridor-id="${c.id}">
          <div class="flex items-center justify-between mb-2.5">
            <div class="flex items-center gap-1.5 font-bold text-white text-xs">
              <span class="text-base">${homeFlag}</span>
              <span class="text-slate-400 font-normal">➔</span>
              <span class="text-base">${targetFlag}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30">
              ${c.leverage} Leverage
            </span>
          </div>
          <div class="font-bold text-white text-xs group-hover:text-[#38BDF8] transition-colors truncate">
            ${c.name}
          </div>
          <div class="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            ${c.desc}
          </div>
          <div class="mt-3 pt-2.5 border-t border-[#26334D]/60 flex items-center justify-between text-[11px] font-mono">
            <span class="text-emerald-400 font-semibold">+${colDiff}% Cost Gap</span>
            <span class="text-[#38BDF8] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Load</span> <i class="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    corridorsGrid.querySelectorAll('.corridor-card').forEach(card => {
      card.addEventListener('click', () => {
        const cid = card.getAttribute('data-corridor-id');
        const c = PPP_DATA.corridors.find(item => item.id === cid);
        if (!c) return;

        currentHomeId = c.homeId;
        currentTargetId = c.targetId;
        currencySelect.value = c.currency;
        salaryInput.value = formatNumber(c.defaultSalary);
        updateComboboxDisplay('home');
        updateComboboxDisplay('target');
        calculate();

        // Sync treaty residence select
        if (treatyResidenceSelect) {
          treatyResidenceSelect.value = c.homeId;
          updateTreatyCheatSheet();
        }

        // Update URL query params
        const url = new URL(window.location.origin + window.location.pathname);
        url.searchParams.set('salary', c.defaultSalary);
        url.searchParams.set('curr', c.currency);
        url.searchParams.set('home', c.homeId);
        url.searchParams.set('target', c.targetId);
        url.searchParams.set('role', roleSelect.value);
        window.history.pushState({}, '', url.toString());

        if (window.confetti) {
          window.confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#38BDF8', '#A3E635', '#10B981']
          });
        }

        showToast(`Loaded ${c.name} corridor benchmarks!`);

        // Smooth scroll to results
        const resultsEl = document.getElementById('results-dashboard');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- 15. Remote Contractor Tax Treaty & W-8BEN Cheat-Sheet ---
  const treatyResidenceSelect = document.getElementById('treaty-residence-select');
  const treatyClientSelect = document.getElementById('treaty-client-select');
  const treatyOutputCard = document.getElementById('treaty-output-card');
  const treatyStatusBadge = document.getElementById('treaty-status-badge');

  function initTreatySelectors() {
    if (!treatyResidenceSelect || !PPP_DATA.locations) return;

    // Populate residences
    treatyResidenceSelect.innerHTML = PPP_DATA.locations.map(loc => {
      const selected = loc.id === currentHomeId ? 'selected' : '';
      return `<option value="${loc.id}" ${selected}>${loc.flag} ${loc.country} (${loc.city})</option>`;
    }).join('');

    treatyResidenceSelect.addEventListener('change', updateTreatyCheatSheet);
    if (treatyClientSelect) {
      treatyClientSelect.addEventListener('change', updateTreatyCheatSheet);
    }
    updateTreatyCheatSheet();
  }

  function updateTreatyCheatSheet() {
    if (!treatyOutputCard) return;

    const resId = treatyResidenceSelect ? treatyResidenceSelect.value : currentHomeId;
    const clientJurisdiction = treatyClientSelect ? treatyClientSelect.value : 'us';

    const loc = PPP_DATA.locations.find(l => l.id === resId) || PPP_DATA.locations[2]; // Default India
    const treatyInfo = (PPP_DATA.contractorTreaties && PPP_DATA.contractorTreaties[resId]) || {
      dtaaExists: true,
      article: 'OECD Model Article 7 (Business Profits)',
      usWithholding: '0% WHT with valid W-8BEN form filed (avoids 30% statutory withholding)',
      statutoryScheme: `${loc.country} Contractor Flat Regime (${loc.contractorTaxRate}% est. rate)`,
      taxRateDesc: `Standard remote professional services deduction applies; estimated ${loc.contractorTaxRate}% contractor slab.`,
      complianceForms: ['IRS Form W-8BEN', 'National Tax ID', 'Certificate of Fiscal Residence'],
      invoiceDirective: 'Exempt from domestic sales tax on foreign service exports.',
      bankingAdvice: 'Retain official commercial bank credit advice / SWIFT MT103 record.'
    };

    // Update Status Badge
    if (treatyStatusBadge) {
      if (treatyInfo.dtaaExists) {
        treatyStatusBadge.className = 'treaty-pill-badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
        treatyStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> DTAA In Effect';
      } else {
        treatyStatusBadge.className = 'treaty-pill-badge bg-amber-500/20 text-amber-400 border border-amber-500/30';
        treatyStatusBadge.innerHTML = '<i class="fa-solid fa-circle-info"></i> Reciprocal Tax Credit';
      }
    }

    const isUSClient = clientJurisdiction === 'us';
    const clientNameMap = {
      us: 'United States 🇺🇸',
      uk: 'United Kingdom 🇬🇧',
      de: 'Germany 🇩🇪',
      ca: 'Canada 🇨🇦',
      sg: 'Singapore 🇸🇬',
      au: 'Australia 🇦🇺',
      nl: 'Netherlands 🇳🇱',
      ae: 'United Arab Emirates 🇦🇪'
    };
    const clientName = clientNameMap[clientJurisdiction] || 'United States';

    treatyOutputCard.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-[#26334D]">
        <!-- Treaty Basis -->
        <div class="space-y-1">
          <span class="text-[10px] font-mono uppercase text-slate-400 font-bold block">1. Legal Treaty Framework</span>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <i class="fa-solid fa-handshake text-[#A3E635]"></i>
            <span>${loc.country} ➔ ${clientName}</span>
          </div>
          <p class="text-[11px] text-slate-300 leading-relaxed font-mono">
            ${treatyInfo.article}
          </p>
        </div>

        <!-- Withholding Tax Rate -->
        <div class="space-y-1">
          <span class="text-[10px] font-mono uppercase text-slate-400 font-bold block">2. Client Withholding (WHT)</span>
          <div class="text-xs font-extrabold text-[#A3E635] flex items-center gap-1.5">
            <i class="fa-solid fa-shield-halved text-[#10B981]"></i>
            <span>${isUSClient ? '0% US Withholding Tax' : '0% Cross-Border Export WHT'}</span>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            ${isUSClient ? treatyInfo.usWithholding : 'Foreign client does not deduct local tax; B2B service reverse charge applies.'}
          </p>
        </div>
      </div>

      <!-- Mandatory Compliance Forms -->
      <div class="space-y-2">
        <span class="text-[10px] font-mono uppercase text-[#38BDF8] font-bold block">3. Mandatory Contractor Forms</span>
        <div class="flex flex-wrap gap-2">
          ${treatyInfo.complianceForms.map(form => `
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0F19] text-white border border-[#26334D] text-xs font-mono font-medium">
              <i class="fa-solid fa-file-lines text-amber-400 text-[10px]"></i>
              <span>${form}</span>
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Local Scheme & Gross to Net Advisory -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div class="p-3 rounded-lg bg-[#0B0F19]/90 border border-[#26334D]">
          <span class="text-[10px] font-mono text-emerald-400 font-bold block mb-1">
            <i class="fa-solid fa-landmark mr-1"></i> ${treatyInfo.statutoryScheme}
          </span>
          <p class="text-[11px] text-slate-300 leading-relaxed">
            ${treatyInfo.taxRateDesc}
          </p>
        </div>

        <div class="p-3 rounded-lg bg-[#0B0F19]/90 border border-[#26334D]">
          <span class="text-[10px] font-mono text-sky-400 font-bold block mb-1">
            <i class="fa-solid fa-receipt mr-1"></i> Invoicing & Bank Remittance
          </span>
          <p class="text-[11px] text-slate-300 leading-relaxed">
            ${treatyInfo.invoiceDirective} ${treatyInfo.bankingAdvice}
          </p>
        </div>
      </div>
    `;
  }

  // --- 16. Methodology & Review Board Feedback Modal Hooks ---
  const boardCorrectionBtn = document.getElementById('board-correction-btn');
  const modalBoardInquiryBtn = document.getElementById('modal-board-inquiry-btn');
  const contactMessageInput = document.getElementById('contact-message');

  function openBoardInquiry() {
    closeModal(methodologyModal);
    switchTermsTab('contact');
    openModal(termsContactModal);
    if (contactMessageInput) {
      contactMessageInput.value = "[Methodology Review Inquiry]\nI would like to provide data feedback or request clarification regarding the purchasing power parity benchmark for:\n";
      contactMessageInput.focus();
    }
  }

  if (boardCorrectionBtn) boardCorrectionBtn.addEventListener('click', openBoardInquiry);
  if (modalBoardInquiryBtn) modalBoardInquiryBtn.addEventListener('click', openBoardInquiry);

  // --- Initialize App ---
  initCurrencies();
  initHiddenSelects();
  loadQueryParams();
  calculate();
  renderCommunityFeed();
  renderCorridors();
  initTreatySelectors();
});
